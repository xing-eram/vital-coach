const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    institution:{
        type: String
    },
    file:{
        type: String
    }
    
})

const Course = model("Course", courseSchema);
module.exports = Course;