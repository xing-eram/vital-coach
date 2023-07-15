const express = require('express');
const trainerRouter = express.Router();
const {
    getProfile, 
    postProfile,
    getSchedule,
    postSechedule,
    postCourses
} = require('../controller/trainer.controller')
const isLoggedOut  = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const uploadImage = require('../middleware/cloudinary')

trainerRouter.get('/:id/profile', isLoggedIn, getProfile)
trainerRouter.post('/:id/profile', isLoggedIn, uploadImage.single('imageProfileTrainer'), postProfile)
trainerRouter.get('/:id/schedule', isLoggedIn, getSchedule)
trainerRouter.post('/:id/schedule', isLoggedIn, postSechedule)
trainerRouter.post('/:id/profile/courses', isLoggedIn,uploadImage.single('fileCourse'), postCourses)

module.exports = trainerRouter;