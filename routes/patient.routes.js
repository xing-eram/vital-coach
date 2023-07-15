const express = require('express');
const patientRouter = express.Router();
const {
    getProfile,
    getDetailTrainer,
    postCreateAppointments
} = require('../controller/patient.controller')

const isLoggedOut  = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

patientRouter.get('/:id/profile', isLoggedIn, getProfile)
patientRouter.get('/:id/detailTrainer', isLoggedIn,getDetailTrainer)
patientRouter.post('/create/:calendarId/appointment', isLoggedIn, postCreateAppointments)

module.exports = patientRouter;