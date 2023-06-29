const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
    description: {
        type: String,
        require: true
    },
    image:{
        type: String
    }
    
})

const Course = model("Course", courseSchema);
module.exports = Course;