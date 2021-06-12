const express = require("express");
const router = express.Router();
const multer = require("multer");
const AppliedJobUsers = require("../modules/applied-job-users");
const checkAuth = require("../middleware/check-auth");



router.post("", checkAuth, (req, res, next) => {

    const appliedJobData = new AppliedJobUsers({
        jobPostId: req.body.jobPostId,
        appliedUsers: req.body.appliedUsers
    })

    appliedJobData.save()
    .then((appliedData) => {
        res.status(201).json({
            message: "Apply Job successfully..!",
            appliedJobData: {
                ...appliedData,
                id: appliedData._id,
                jobPostId: appliedData.jobPostId,
                appliedUsers: appliedData.appliedUsers,
                createPost: appliedData.createPost
                
            }
        })
    })
    
})

router.put("/:id", checkAuth, (req, res, next) => {
  
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
    AppliedJobUsers.find().then((data) => {
        res.status(201).json({
            message: "Apply data fetched successfully",
            appliedData: data
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