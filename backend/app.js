const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const profBnrRoutes = require("./routes/profile-banner");
const profileCreate = require("./routes/profile");
const userRoutes = require("./routes/user");
const profilePicture = require("./routes/profile-picture");
const educations = require("./routes/educations");
const experience = require("./routes/experience");
const skillSet = require("./routes/skill-set");
const profileResume = require("./routes/profile-resume");
const postJobs = require("./routes/post-jobs");
const applyJobs = require("./routes/applied-job-users");

const path = require("path")
const app = express();

mongoose.connect("mongodb+srv://vinoth:"+ process.env.MONGO_ATLAS_PW+"@cluster0.vyknk.mongodb.net/node-angular")
.then(() => {
    console.log("Database connected!")
})
.catch(() =>{
    console.log("Connection failed..!")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images/profile-banner", express.static(path.join("backend/images/profile-banner")));
app.use("/images/profile-picture", express.static(path.join("backend/images/profile-picture")));
app.use("/files/resumes", express.static(path.join("backend/files/resumes")));
app.use("/images/job-logo", express.static(path.join("backend/images/job-logo")));

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
})


app.use("/api/user", userRoutes);
app.use("/api/profile", profileCreate);
app.use("/api/profilebanner", profBnrRoutes);
app.use("/api/profilePicture", profilePicture);
app.use("/api/educations", educations);
app.use("/api/experience", experience);
app.use("/api/skillset", skillSet);
app.use("/api/profileresume", profileResume);
app.use("/api/postjobs", postJobs);
app.use("/api/applyJobs", applyJobs);


module.exports = app;