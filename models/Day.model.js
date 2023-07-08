const { Schema, model } = require("mongoose");

const daySchema = new Schema({
    date: Date,
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    openTimeBlocks: [ Number ],
    scheduledTimeBlocks: [ Number ],
})

const Day = model('Day', daySchema);
module.exports = Day;