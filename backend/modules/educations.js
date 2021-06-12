const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const educationSchema = mongoose.Schema({
    schools: { type: String, required: true },
    degree: { type: String, required: true }, 
    feildOfStds: { type: String, required: true },
    stYear: { type: String, required: true },
    endYear: { type: String, required: true },
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

// profileTitle.plugin(uniqueValidator);
module.exports = mongoose.model('Education', educationSchema);