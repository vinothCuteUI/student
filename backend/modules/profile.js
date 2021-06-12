const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const profileSchema = mongoose.Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true }, 
    email: { type: String, required: true },
    contact: { type: String, required: true },
    jobTitle: { type: String, required: true }, 
    currentJob: { type: String, required: true }, 
    experience: { type: String, required: true }, 
    location: { type: String, required: true }, 
    city: { type: String, required: true }, 
    Objective: { type: String, required: true }, 
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

// profileTitle.plugin(uniqueValidator);
module.exports = mongoose.model('Profile', profileSchema);