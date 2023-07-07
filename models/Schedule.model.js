const { Schema, model } = require("mongoose");
const { TrainerSchema } = require('./Trainer.model');

const scheduleSchema = new Schema({
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    openTimeBlocks: [ Number ],
    trainer: {
        type: Schema.ObjectId, 
        ref: 'Trainer'
    }
})

const Schedule = model('Schedule', scheduleSchema);
module.exports = Schedule;