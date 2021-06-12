const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const appliedJobUserSchema = mongoose.Schema({
    jobPostId: { type: String, required: true },
    appliedUsers: { type: String, required: true},
    createPost: { type: Date, default : Date.now}
})

// profileTitle.plugin(uniqueValidator);
module.exports = mongoose.model('Appliedjobusers', appliedJobUserSchema);