const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const Trainer = require('../models/Trainer.model')
const Schedule = require('../models/Schedule.model')

const getProfile = async (req, res, next) => {
    try {
        const { _id, username, email, profile } = req.session.currentUser;
        const foundTrainer = await Trainer.findOne({user: _id})
        .populate( {path: 'user'} )

        if(foundTrainer){
            res.render('trainer/trainer-profile', {_id, username, email, profile, foundTrainer});
            console.log(foundTrainer)
        }else{
            res.render('trainer/trainer-profile', {_id, username, email, profile});
            console.log(foundTrainer)
        }
    } catch (error) {
        next(error)
    }
}

const postProfile = async (req, res, next) => {
    try {
        const { _id, username, email, profile } = req.session.currentUser;
        const { name, lastname, gender, from, birthday, cellphone } = req.body;

        const foundTrainer = await Trainer.findOne({user: _id})
        .populate( {path: 'user'} )

        if(foundTrainer){
            const updateTrainer = await Trainer.findByIdAndUpdate({user: _id}, {name, lastname, gender, from, birthday, cellphone })
            .populate( {path: 'user'} )
            res.redirect(`/trainer/${_id}/profile`);
        }else{
            const createTrainer = await Trainer.create( {name, lastname, gender, from, birthday, cellphone, user: _id})

            res.redirect(`/trainer/${_id}/profile`);
        }
        
        
    } catch (error) {
        next(error);
    }
}

const getSchedule = async (req, res, next) => {
    try {
        const { _id, username, email, profile } = req.session.currentUser;
        const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        const data = {
            rows: []
        };

        for (let i = 0; i < 24; i++) {
            let cols = []
            for (let j = 0; j < 7; j++) {
                cols.push({
                day: weekDays[j],
                hour: i
            })
        }
        data.rows.push({
            hour: i,
            cols
        })      
        }
        res.render('trainer/schedule-trainer', { rows: data.rows, _id });
    } catch (error) {
        next(error);
    }
}

const postSechedule = async (req, res, next) => {
    try {
        const dayHours = Array(24).fill(1).map((_, i) => i);
        console.log(dayHours)
        const {day, hour} = req.body;
        const { _id, username, email, profile } = req.session.currentUser;
       

        const {_id: _idTrainer }  = await Trainer.findOne({user: _id})
        .populate( {path: 'user'} )

        //const {_id: _idTrainer } = foundTrainer

        for (const day of Object.keys(req.body)) {
            await Schedule.create({
                day: day,
                openTimeBlocks: req.body[day],
                trainer:_idTrainer
            })
 
        }
        console.log('req.body: ', req.body);
        res.redirect(`/trainer/${_id}/schedule`);

        
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getProfile,
    postProfile,
    getSchedule,
    postSechedule
};