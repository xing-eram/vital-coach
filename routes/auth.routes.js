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

userRouter.get('/signup', getSignup);
userRouter.post('/signup', postSignup);
userRouter.get('/login', getLogin);
userRouter.post('/login', postLogin);
userRouter.get('/admin/:id/main', isAdmin, getAdminMain);
userRouter.get('/patient/:id/main', getMainPatient);
userRouter.get('/trainer/:id/main', getMainTrainer);


module.exports = userRouter;