const express = require("express");
const router = express.Router();

const Educations = require("../modules/educations");
const checkAuth = require("../middleware/check-auth");

router.post("", checkAuth, (req, res, next) => {
    const educatData = new Educations({
        schools: req.body.schools,
        degree: req.body.degree,
        feildOfStds: req.body.feildOfStds,
        stYear: req.body.stYear,
        endYear: req.body.endYear,
        creator: req.userData.userId
    })

    educatData.save().then((educateData) => {
        res.status(201).json({
            message: "Education updated successfully..!",
            education: {
                ...educateData,
                id: educateData._id,
                creator: educateData.creator
            }
        })
    })
})

router.get("", (req, res, next) =>{
    Educations.find().then((data) => {
        res.status(201).json({
            message: "Education fetched successfully",
            educData: data
        })
    })
})

router.put("/:id", checkAuth, (req, res, next) =>{
    const educData = new Educations({
        _id: req.body.id,
        schools: req.body.schools,
        degree: req.body.degree,
        feildOfStds: req.body.feildOfStds,
        stYear: req.body.stYear,
        endYear: req.body.endYear,
        creator: req.userData.userId
    })
    Educations.updateOne({_id: req.params.id, creator: req.userData.userId}, educData)
    .then((result) => {
        if(result.nModified > 0){
            res.status(200).json({
                message: "Post updated ..!",
                eductData: educData._doc
            })
        }else{
            res.status(200).json({
                message: "Not updated ..!"
            })
        }
    })
})

router.get("/:id", (req, res, next) => {
    Educations.findById(req.params.id).then(educData => {
        if(educData){
            res.status(200).json(educData)
            //console.log(profBnr)
        }else{
            res.status(200).json({
                message: "Post not found ..!"
            })
        }
    })
})

router.delete("/:id", checkAuth, (req, res, next) =>{
    Educations.deleteOne({_id: req.params.id, creator: req.userData.userId}).then((result) => {
        //console.log(result)
        if(result.n > 0){
            res.status(200).json({
                message: "Educations Deleted ..!"
            })
        }else{
            res.status(200).json({
                message: "Not Deleted ..!"
            })
        }
    })
})

module.exports = router