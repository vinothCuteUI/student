const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const postJobSchema = mongoose.Schema({
    jobStatus: { type: String, required: true },
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true }, 
    jobDigree: { type: String, required: true }, 
    jobLocation: { type: String, required: true },
    interviewDate: { type: String, required: true },
    primarySkills: { type: String, required: true },
    spokenLanguage: { type: String, required: true },
    standingArrears: { type: String, required: true },
    gender: { type: String, required: true },
    jobValPrFrom: { type: String, required: true },
    jobValPrTo: { type: String, required: true },
    grossPayMin: { type: String, required: true },
    grossPayMax: { type: String, required: true },
    jobDescription: { type: String, required: true },
    appliedUsers: { type: Array},
    createPost: { type: Date, default : Date.now},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

// profileTitle.plugin(uniqueValidator);
module.exports = mongoose.model('Postjobs', postJobSchema);