const express = require('express');
const userRouter = express.Router();

const { 
    getSignup, 
    postSignup,
    getLogin,
    postLogin,
    getMainPatient,
    getMainTrainer,
    getAdminMain
 } = require('../controller/auth.controller')

const { isAdmin } = require('../middleware/isAdmin.route.middleware')
const isLoggedOut  = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

userRouter.get('/signup', isLoggedOut, getSignup);
userRouter.post('/signup', isLoggedOut, postSignup);
userRouter.get('/login', isLoggedOut, getLogin);
userRouter.post('/login', isLoggedOut, postLogin);
userRouter.get('/admin/:id/main', isLoggedIn, isAdmin, getAdminMain);
userRouter.get('/patient/:id/main', isLoggedIn, getMainPatient);
userRouter.get('/trainer/:id/main', isLoggedIn, getMainTrainer);


module.exports = userRouter;