const mongoose = require('mongoose');

const Trainer = require('../models/Trainer.model')
const getTrainers = async (req, res, next) => {
    try {
      const { _id, username, email, profile } = req.session.currentUser;
      const foundTrainers = await Trainer.find();
      res.render("home/trainers", {
        _id,
        username,
        email,
        profile,
        foundTrainers,
      });
    } catch (error) {
      next(error);
    }
  };


  module.exports = {getTrainers};