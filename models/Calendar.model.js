const { Schema, model } = require('mongoose');


const calendarSchema = new Schema(
    {
        date: Date,
        // el userId para calendarios es solo para usuarios Admin
        trainerId: {
            type: Schema.Types.ObjectId,
            ref: 'Trainer' 
        },
        appointments: [{
            type: Schema.Types.ObjectId,
            ref: 'Appointment'             
        }],
        days: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Day',
            },
        ],
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`    
      timestamps: true
    }
)

const Calendar = model("Calendar", calendarSchema);

module.exports = Calendar;