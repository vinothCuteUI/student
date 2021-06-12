const mongoose = require("mongoose");

const profileResumeSchema = mongoose.Schema({
    fileName: { type: String, required: true },
    resumePath: { type: String, required: true },
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

module.exports = mongoose.model('Resume', profileResumeSchema);