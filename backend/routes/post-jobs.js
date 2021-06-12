const express = require("express");
const router = express.Router();
const multer = require("multer");
const PostJobs = require("../modules/post-jobs");
const checkAuth = require("../middleware/check-auth");



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
        
//         cb(null, "backend/images/job-logo");
//     },
//     filename: (req, file, cb) => {
//         const filename = file.originalname.toLowerCase().split(' ').join("-");
//         //const exts = MIME_TYPE_MAP[file.mimetype];
//         cb(null, filename.split(".")[0] + '-' + Date.now() + "."+filename.split(".")[1]);
//     }
// })

router.post("", checkAuth, (req, res, next) => {
    // const url = req.protocol + "://" + req.get("host");

    const jobData = new PostJobs({
        jobStatus: req.body.jobStatus,
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        jobDigree: req.body.jobDigree,
        jobLocation: req.body.jobLocation,
        interviewDate: req.body.interviewDate,
        primarySkills: req.body.primarySkills,
        spokenLanguage: req.body.spokenLanguage,
        standingArrears: req.body.standingArrears,
        gender: req.body.gender,
        jobValPrFrom: req.body.jobValPrFrom,
        jobValPrTo: req.body.jobValPrTo,
        grossPayMin: req.body.grossPayMin,
        grossPayMax: req.body.grossPayMax,
        jobDescription: req.body.jobDescription,
        appliedUsers: req.body.appliedUsers,
        creator: req.userData.userId
    })

    jobData.save()
    .then((postData) => {
        res.status(201).json({
            message: "Job post updated successfully..!",
            jobPosts: {
                ...postData,
                id: postData._id,
                jobStatus: postData.jobStatus,
                companyName: postData.companyName,
                jobTitle: postData.jobTitle,
                jobDigree: postData.jobDigree,
                jobLocation: postData.jobLocation,
                interviewDate: postData.interviewDate,
                primarySkills: postData.primarySkills,
                spokenLanguage: postData.spokenLanguage,
                standingArrears: postData.standingArrears,
                gender: postData.gender,
                jobValPrFrom: postData.jobValPrFrom,
                jobValPrTo: postData.jobValPrTo,
                grossPayMin: postData.grossPayMin,
                grossPayMax: postData.grossPayMax,
                jobDescription: postData.jobDescription,
                appliedUsers: postData.appliedUsers,
                createPost: postData.createPost,
                creator: postData.creator
            }
        })
    })
    
})

router.put("/:id", checkAuth, (req, res, next) => {
    // let imagePath;
    // if(req.file){
    //     const url = req.protocol + "://" + req.get("host");
    //     imagePath = url + "/images/job-logo/" + req.file.filename
    // }
    const jobPost = new PostJobs({
        _id: req.body.id,
        jobStatus: req.body.jobStatus,
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        jobDigree: req.body.jobDigree,
        jobLocation: req.body.jobLocation,
        interviewDate: req.body.interviewDate,
        primarySkills: req.body.primarySkills,
        spokenLanguage: req.body.spokenLanguage,
        standingArrears: req.body.standingArrears,
        gender: req.body.gender,
        jobValPrFrom: req.body.jobValPrFrom,
        jobValPrTo: req.body.jobValPrTo,
        grossPayMin: req.body.grossPayMin,
        grossPayMax: req.body.grossPayMax,
        jobDescription: req.body.jobDescription,
        creator: req.userData.userId
    })
    PostJobs.updateOne({_id: req.params.id, creator: req.userData.userId}, jobPost)
    .then(result => {
        if(result.nModified > 0){
            res.status(200).json({
                message: "Post updated ..!",
                postJob: jobPost._doc
            })
        }else{
            res.status(200).json({
                message: "Not updated ..!"
            })
        }
    })
})


router.get("", (req, res, next) =>{
    PostJobs.find().then((data) => {
        res.status(201).json({
            message: "Post jobs fetched successfully",
            jobPost: data
        })
    })
})

router.delete("/:id", checkAuth, (req, res, next) =>{
    PostJobs.deleteOne({_id: req.params.id, creator: req.userData.userId})
    .then((result) => {
        if(result.n > 0){
            res.status(200).json({
                message: "Job Deleted ..!"
            })
        }else{
            res.status(200).json({
                message: "Not Deleted ..!"
            })
        }
    })
})

router.get("/:id", (req, res, next) =>{
    
    PostJobs.findById(req.params.id).then((jobsData) => {
        if(jobsData){
            res.status(200).json(jobsData)
            //console.log(profBnr)
        }else{
            res.status(200).json({
                message: "Jobs not found ..!"
            })
        }
    })
})

module.exports = router