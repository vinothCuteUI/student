const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const experienceSchema = mongoose.Schema({
    jobrole: { type: String, required: true },
    employment: { type: String, required: true }, 
    location: { type: String, required: true },
    company: { type: String, required: true },
    stMonth: { type: String, required: true },
    stYear: { type: String, required: true },
    endMonth: { type: String, required: true },
    endYear: { type: String, required: true },
    currentStatus: { type: String, required: true },
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

// profileTitle.plugin(uniqueValidator);
module.exports = mongoose.model('Experience', experienceSchema);