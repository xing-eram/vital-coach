const { Schema, model } = require('mongoose');

const appointmentSchema = new Schema({
    date: {
        type: Date,
        require: true
    },
    scheduledTimeBlocks: [ Number ],
    cancelledTimeBlocks: [ Number ],
    patientId:{ 
        type: Schema.ObjectId, 
        ref: 'Patient' 
    },
    dayId: {
        type: Schema.Types.ObjectId,
        ref: 'Day'
    }

},
{
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
 }
 )

const Appointment = model('Appointment', appointmentSchema);
module.exports = Appointment;