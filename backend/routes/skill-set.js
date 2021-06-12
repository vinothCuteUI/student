const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const SkillSet = require("../modules/skill-set");
const checkAuth = require("../middleware/check-auth"); 


router.post("", checkAuth, (req, res, next) => {
    const skillSet = new SkillSet({
        skillSet: req.body.skillSet,
        creator: req.userData.userId
    })

    skillSet.save().then((skillData) => {
        res.status(201).json({
            message: "skills updated successfully..!",
            skillData: {
                ...skillData,
                id: skillData._id,
                creator: skillData.creator
            }
        })
    })
})

router.get("", (req, res, next) =>{
    SkillSet.find().then((data) => {
        res.status(201).json({
            message: "Education fetched successfully",
            skillData: data
        })
    })
})


router.put("/:id", checkAuth, (req, res, next) =>{
    
    const skills = new SkillSet({
        _id: req.body.id,
        skillSet: req.body.skillSet,
        creator: req.userData.userId
    })
    SkillSet.updateOne({_id: req.params.id, creator: req.userData.userId}, skills).then((result) => {
        //console.log(result)
        if(result.nModified > 0){
            res.status(200).json({
                message: "skills updated ..!",
                skillsData: skills._doc
            })
        }else{
            res.status(200).json({
                message: "Not updated ..!"
            })
        }
        
    })
})

router.delete("/:id", checkAuth, (req, res, next) =>{
    SkillSet.deleteOne({_id: req.params.id, creator: req.userData.userId}).then((result) => {
        //console.log(result)
        if(result.n > 0){
            res.status(200).json({
                message: "SkillSet Deleted ..!"
            })
        }else{
            res.status(200).json({
                message: "SkillSet Not Deleted ..!"
            })
        }
    })
})

module.exports = router