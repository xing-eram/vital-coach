const mongoose = require('mongoose');
const Patient = require('../models/Patients.model')
const Trainer = require('../models/Trainer.model')
const Calendar = require('../models/Calendar.model')
const Day = require('../models/Day.model')
const createCalendar = require('../utils/create-calendar');
const Appointment = require('../models/Appointments.model');
const User = require('../models/User.model');

const getProfile = async (req, res, next) => {
    try {
        const { _id, username, email, profile } = req.session.currentUser;
        const foundPatient = await Patient.findOne()
        .populate( {path: 'user'} )


        if(foundPatient){
            res.render('patient/patient-profile', {_id, username, email, profile, foundPatient});
            console.log(foundPatient)
        }else{
            res.render('patient/patient-profile', {_id, username, email, profile});
            console.log(foundPatient)
        }
    } catch (error) {
        next(error)
    }
}

const getDetailTrainer = async (req, res, next) => {
    try {
        const { _id } = req.param;

        const foundTrainer = await Trainer.findOne(_id)

        console.log(foundTrainer)

        const {_id: idTrainer} = foundTrainer;

        let calendarData;
        // si el usuario logueado es un admin revisamos si ya tiene un calendario asociado
        calendarData = await Calendar.findOne({trainerId: idTrainer})
        .populate('trainerId')
        .populate({
            path: 'days',
            populate:{
                path: 'appointments',
                model: 'Appointment'
            }
            
        })
        console.log('calendarData: ', calendarData);
      
      
        console.log(idTrainer)
        const calendar = createCalendar(calendarData, 6, 20);


        res.render('patient/trainer-detail', {foundTrainer, idTrainer, rows: calendar.rows, calendarId: calendarData && calendarData._id})
    } catch (error) {
        next(error)
    }
}

const postCreateAppointments = async (req, res, next) => {
    const { calendarId } = req.params;
    console.log('calendarId: ', calendarId);
    // Una vez que tenemos el calendario, le agregamos los appointments
    // echos por el usuario con id igual a userId
    console.log('req.body: ', req.body);
    const { _id: userId } = req.session.currentUser;

    const daysRequestedForAppointment = Object.keys(req.body);

    const calendar = await Calendar.findById(calendarId)
    .populate('trainerId')
    .populate({ 
        path: 'days',
        populate: {
            path: 'appointments',
            model: 'Appointment'
        }
    });
    const trainerId = calendar.trainerId._id;
    console.log('calendar from appointment: ', calendar)
    // En el calendario debemos verificar que el horario solcitado para la cita (appointemnt) este disponible 
    for (const day of calendar.days) {
        // solo revisaremos los dias donde se solicito appointment
        if(daysRequestedForAppointment.includes(day.day)) {
            const dayId = day._id;
            // data sent in the req.body looks like: { 'Jueves': '16', 'Viernes': ['17', '19'] }
            const requestedBookedBlocks = typeof req.body[day.day] === 'string' ? [Number(req.body[day.day])] : req.body[day.day].map(Number)
            console.log('day selected to do the appointment: ', day.day);
            // y si las horas solicitadas estan dentro de los horarios disponibles
            console.log('day.openTimeBlocks: ', day.openTimeBlocks, 'requestedBookedBlocks: ', requestedBookedBlocks);
            if(contains(day.openTimeBlocks, requestedBookedBlocks)) {
                // revisamos que no haya colisión con otros appointments echos para el dia que estamos iterando (que no le pertenezcan al usuario)
                const scheduledBLocks = day.appointments.flatMap(a => {
                    // Esta condicion le esta permitiendo a un user hace cambios en sus appointments
                    if(a.patientId !== userId)  // comentar esta linea si no queremos que el usuario pueda re-agendar sus propias citas
                        return a.scheduledBLocks
                }).filter(Boolean)
                console.log('scheduledBLocks: ', scheduledBLocks);
                const validAppointments = calculateAvailableBlocks(scheduledBLocks, requestedBookedBlocks);
                // we create an appointment wiht the validAppointments
                console.log('day: ', day.day ,'validAppointments', validAppointments);
                const createdAppointment = await Appointment.create({
                    date: new Date(),
                    patientId: userId,
                     // id del user haciendo la cita
                    scheduledTimeBlocks: validAppointments,
                    dayId
                })
                const appointmentId = createdAppointment._id;
                console.log('dayId: ', dayId)
                console.log('createdAppointment._id: ', appointmentId);
                const updatedDay = await Day.findByIdAndUpdate(
                    dayId,
                    { $push: { appointments: appointmentId } },
                    { new: true }
                )
                console.log('updatedDay: ', updatedDay);
            }
        }
    }
    User.findByIdAndUpdate(userId,{    
         $push: { trainers: trainerId } ,
    })
    // /owner/${calendar.userId._id}/detail
    res.redirect(`/patient/${trainerId}/detailTrainer`)
}

function calculateAvailableBlocks(A, B) {
    return B.filter(item => !A.includes(item));
}

/**
 * contains tell us if the array B is contained in the array A
 * @param {*} A an array of numbers
 * @param {*} B an array of numbers
 * @returns 
 */

function contains(A, B) {
    return B.every(element => A.includes(element));
}

module.exports = {
    getProfile,
    getDetailTrainer,
    postCreateAppointments
};