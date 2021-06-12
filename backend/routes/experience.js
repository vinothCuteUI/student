const express = require("express");
const router = express.Router();

const Experience = require("../modules/experience");
const checkAuth = require("../middleware/check-auth");

router.post("", checkAuth, (req, res, next) => {
    const experienceData = new Experience({
        jobrole: req.body.jobrole,
        employment: req.body.employment,
        location: req.body.location,
        company: req.body.company,
        stMonth: req.body.stMonth,
        stYear: req.body.stYear,
        endMonth: req.body.endMonth,
        endYear: req.body.endYear,
        currentStatus: req.body.currentStatus,
        creator: req.userData.userId
    })

    experienceData.save().then((expercData) => {
        res.status(201).json({
            message: "Education updated successfully..!",
            experiencesData: {
                ...expercData,
                id: expercData._id,
                creator: expercData.creator
            }
        })
    })
})

router.get("", (req, res, next) =>{
    Experience.find().then((data) => {
        res.status(201).json({
            message: "Experience fetched successfully",
            expercData: data
        })
    })
})

router.put("/:id", checkAuth, (req, res, next) =>{
    const exprData = new Experience({
        _id: req.body.id,
        jobrole: req.body.jobrole,
        employment: req.body.employment,
        location: req.body.location,
        company: req.body.company,
        stMonth: req.body.stMonth,
        stYear: req.body.stYear,
        endMonth: req.body.endMonth,
        endYear: req.body.endYear,
        currentStatus: req.body.currentStatus,
        creator: req.userData.userId
    })
    Experience.updateOne({_id: req.params.id, creator: req.userData.userId}, exprData)
    .then((result) => {
        if(result.nModified > 0){
            res.status(200).json({
                message: "Post updated ..!",
                expData: exprData._doc
            })
        }else{
            res.status(200).json({
                message: "Not updated ..!"
            })
        }
    })
})

router.get("/:id", (req, res, next) => {
    Experience.findById(req.params.id).then(exprData => {
        if(exprData){
            res.status(200).json(exprData)
            //console.log(profBnr)
        }else{
            res.status(200).json({
                message: "Data not found ..!"
            })
        }
    })
})

router.delete("/:id", checkAuth, (req, res, next) =>{
    Experience.deleteOne({_id: req.params.id, creator: req.userData.userId}).then((result) => {
        //console.log(result)
        if(result.n > 0){
            res.status(200).json({
                message: "Experience Deleted ..!"
            })
        }else{
            res.status(200).json({
                message: "Not Deleted ..!"
            })
        }
    })
})

module.exports = router