const mongoose = require('mongoose');
const User = require('../models/User.model');
const Trainer = require('../models/Trainer.model')
const Day = require('../models/Day.model')
const Calendar = require('../models/Calendar.model')
const Course = require('../models/Courses.model')
const createCalendar = require('../utils/create-calendar')

const getProfile = async (req, res, next) => {
    try {
        const { _id, username, email, profile } = req.session.currentUser;
        const foundTrainer = await Trainer.findOne({user: _id})
        .populate( {path: 'user'} )
        .populate( {path: 'courses'} )

        console.log(foundTrainer)
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
        const { _id: idUser, username, email, profile } = req.session.currentUser;
        const { name, lastName, gender, from, birthday, cellPhone, training, description} = req.body;

        

        const foundTrainer = await Trainer.findOne({user: idUser})
        .populate( {path: 'user'} )
        console.log(foundTrainer)
        const trainerId = foundTrainer._id;

        if(req.file){
            const updateTrainer = await Trainer.findByIdAndUpdate({_id: trainerId}, {name, lastName, gender, from, birthday, cellPhone, training, description, image: req.file.path})
        
            res.redirect(`/trainer/${idUser}/profile`);
   
        }else{
            
            const updateTrainer = await Trainer.findByIdAndUpdate({_id: trainerId}, {name, lastName, gender, from, birthday, cellPhone, training, description})
            
            res.redirect(`/trainer/${idUser}/profile`);
   
        }

             
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
                model:'Appointment'
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
        const {day, hour} = req.body;
        const { _id: idUser, username, email, profile } = req.session.currentUser;
        

        const foundTrainer = await Trainer.findOne({user: idUser})  
        .populate( {path: 'user'} )

        const {_id: idTrainer } = foundTrainer;

        const calendar = await Calendar.findOne({trainerId: idTrainer});
        let calendarId =  calendar && calendar._id;

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
        res.redirect(`/auth/trainer/${idUser}/main`);
        
    } catch (error) {
        next(error)
    }
}

const postCourses = async (req, res, next) => {
    try {
        const { _id: idUser, username, email, profile } = req.session.currentUser;
        const { title, institution} = req.body

        const foundTrainer = await Trainer.findOne({user: idUser})  
        .populate( {path: 'user'} )

        const {_id: idTrainer } = foundTrainer;

        console.log(idTrainer);

        if(!title) {
            return res.status(400).render('auth/signup', { errorMessage: 'The title fiel is required' });
        }
        if(!institution) {
            return res.status(400).render('auth/signup', { errorMessage: 'The institution fiel is required' });
        }

        if(req.file){
            const createCourse = await Course.create({title, institution, file: req.file.path});

            if(createCourse){
                await Trainer.findByIdAndUpdate({_id: idTrainer},
                    { $push: { courses: createCourse._id } },
                    { new: true })


                res.redirect(`/trainer/${idUser}/profile`);
            }else{
                return res.status(400).render('trainer/trainer-profile', { errorMessage: 'could not add the course' });
            }

        }else{
            return res.status(400).render('trainer/trainer-profile', { errorMessage: 'the file could not be loaded' });
        }
        
    } catch (error) {
        
    }
}

module.exports = {
    getProfile,
    postProfile,
    getSchedule,
    postSechedule,
    postCourses
};