const mongoose = require('mongoose');
const User = require('../models/User.model');
const Trainer = require('../models/Trainer.model')
const Day = require('../models/Day.model')
const Calendar = require('../models/Calendar.model')
const createCalendar = require('../utils/create-calendar')

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
        const { name, lastName, gender, from, birthday, cellPhone, training, description, image} = req.body;

        const foundTrainer = await Trainer.findOne({user: _id})
        .populate( {path: 'user'} )

        const updateTrainer = await Trainer.findByIdAndUpdate({user: _id}, {name, lastName, gender, from, birthday, cellPhone, training, description})
        .populate( {path: 'user'} )
        res.redirect(`/trainer/${_id}/profile`);
        
    } catch (error) {
        next(error);
    }
}

const getSchedule = async (req, res, next) => {
    try {
        const { _id: idUser, username, email, profile } = req.session.currentUser;

        const foundTrainer = await Trainer.findOne({user: idUser})  
        .populate({ path: 'user' })

        const { _id: idTrainer }  = foundTrainer;

        console.log('validamos que esta viajando el id del Entrenador', idTrainer)
        let calendarData;
        // si el usuario logueado es un admin revisamos si ya tiene un calendario asociado
        calendarData = await Calendar.findOne({trainerId: idTrainer})
        .populate( 'trainerId')
        .populate({
            path: 'days',
            populate:{
                path: 'appointments',
                model: 'Appointment'
            }
           
        })
        // console.log('calendarData: ', calendarData);
      
      
        const calendar = createCalendar(calendarData, 6, 20);

        res.render('trainer/schedule-trainer', {idUser, rows: calendar.rows  });
    } catch (error) {
        next(error);
    }
}

const postSechedule = async (req, res, next) => {
    try {
    
        console.log('entramos al metodo post para crear el calendario')
        const {day, hour} = req.body;
        const { _id: idUser, username, email, profile } = req.session.currentUser;
        

        const foundTrainer = await Trainer.findOne({user: idUser})  
        .populate( {path: 'user'} )

        const {_id: idTrainer } = foundTrainer;

        const calendar = await Calendar.findOne({trainerId: idTrainer});
        let calendarId =  calendar && calendar._id;
        console.log('esto no se que es',calendarId);

        if(!calendarId) {
            // si no tenia, creamos un nuevo calendario
            const newCalendar = await Calendar.create({
                date: new Date(),
                trainerId: idTrainer,
            })
            calendarId = newCalendar._id;
        }

        const newDays = [];
        for (const day of Object.keys(req.body)) {
            const calendarDay = await Day.create({
                day: day,
                date: new Date(), //
                openTimeBlocks: req.body[day]
            }); 
            newDays.push(calendarDay._id);
        }

        await Calendar.findByIdAndUpdate(
            calendarId, // buscamos el calendario asociado al user
            { $set: { days: newDays } }, // y le agregamosidTrainer los dias creados
            { new: true } 
        )

        
        console.log('req.body: ', req.body);
        res.redirect(`/trainer/${idUser}/schedule`)
        
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