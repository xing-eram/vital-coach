const express = require('express');
const trainerRouter = express.Router();
const {
    getProfile, 
    postProfile,
    getSchedule,
    postSechedule,
    postCourses
} = require('../controller/trainer.controller')

const uploadImage = require('../middleware/cloudinary')

trainerRouter.get('/:id/profile', getProfile)
trainerRouter.post('/:id/profile', uploadImage.single('imageProfileTrainer'), postProfile)
trainerRouter.get('/:id/schedule', getSchedule)
trainerRouter.post('/:id/schedule', postSechedule)
trainerRouter.post('/:id/profile/courses', uploadImage.single('fileCourse'), postCourses)

module.exports = trainerRouter;