const express = require('express');
const homeRouter = express.Router();

const {getTrainers} = require('../controller/home.controller')

homeRouter.get('/trainers', getTrainers)

module.exports = homeRouter;