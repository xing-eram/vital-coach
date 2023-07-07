const express = require('express');
const trainerRouter = express.Router();
const {
    getProfile, 
    postProfile,
    getSchedule,
    postSechedule
} = require('../controller/trainer.controller')

trainerRouter.get('/:id/profile', getProfile)
trainerRouter.post('/:id/profile', postProfile)
trainerRouter.get('/:id/schedule', getSchedule)
trainerRouter.post('/:id/schedule', postSechedule)

module.exports = trainerRouter;