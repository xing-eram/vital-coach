const { Schema, model } = require("mongoose");

const appoinmentSchema = new Schema({
    date: {
        type: Date,
        require: true
    },
    patientId:{ 
        type: Schema.ObjectId, 
        ref: 'Patient' 
    },
    trainerId: { 
        type: Schema.ObjectId, 
        ref: 'Trainer' 
    }
})

const Appoinment = model('Appoinment', appoinmentSchema);
module.exports = Appoinment;