const { Schema, model } = require("mongoose");
const { TrainerSchema } = require('./Trainer.model');

const scheduleSchema = new Schema({
    date: {
        type: Date,
        require: true
    },
    startTime:{
        type: Date,
        require: true
    },
    endTime:{
        type: Date,
        require: true
    }
    
})

const Schedule = model('Schedule', scheduleSchema);
module.exports = Schedule;