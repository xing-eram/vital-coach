const { Schema, model } = require("mongoose");
const { appointmentSchema } = require('../models/Appointments.model')

const daySchema = new Schema({
    date: Date,
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    openTimeBlocks: [ Number ],
    appointments: [ {
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    } ],
})

const Day = model('Day', daySchema);
module.exports = Day;