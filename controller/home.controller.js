const mongoose = require('mongoose');

const Trainer = require('../models/Trainer.model')
const getTrainers = async (req, res, next) => {
    try {

      const foundTrainers = await Trainer.find();
      res.render("home/trainers", {
        foundTrainers,
      });
    } catch (error) {
      next(error);
    }
  };


  module.exports = {getTrainers};