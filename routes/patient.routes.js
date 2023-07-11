const express = require('express');
const patientRouter = express.Router();
const {
    getProfile,
    getDetailTrainer,
    postCreateAppointments
} = require('../controller/patient.controller')

patientRouter.get('/:id/profile', getProfile)
patientRouter.get('/:id/detailTrainer', getDetailTrainer)
patientRouter.post('/create/:calendarId/appointment', postCreateAppointments)

module.exports = patientRouter;