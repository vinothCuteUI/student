const express = require("express");
const router = express.Router();
// const multer = require("multer");
const Profile = require("../modules/profile");
const checkAuth = require("../middleware/check-auth");

router.post("", checkAuth, (req, res, next) => {
    console.log(req.body)
    const profile = new Profile({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        contact: req.body.contact,
        jobTitle: req.body.jobTitle,
        currentJob: req.body.currentJob,
        experience: req.body.experience,
        location: req.body.location,
        city: req.body.city,
        Objective: req.body.Objective,
        creator: req.userData.userId
    })
    
    profile.save().then((createProfile) => {
        res.status(201).json({
            message: "Profile Title added successfully",
            // postId: createPost.id
            profiles: {
                ...createProfile,
                id: createProfile._id,
                creator: createProfile.creator
            }
        })
    })
})

router.get("",(req, res, next) => {
    
    Profile.find().then((datas) => {
        res.status(200).json({
            message: "Post fetched successfully",
            profile: datas
           
        });
    })

    
})


router.put("/:id", checkAuth, (req, res, next) =>{
    
    const profile = new Profile({
        _id: req.body.id,
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        contact: req.body.contact,
        jobTitle: req.body.jobTitle,
        currentJob: req.body.currentJob,
        experience: req.body.experience,
        location: req.body.location,
        city: req.body.city,
        Objective: req.body.Objective,
        creator: req.userData.userId
    })
    Profile.updateOne({_id: req.params.id, creator: req.userData.userId}, profile).then((result) => {
        //console.log(result)
        if(result.nModified > 0){
            res.status(200).json({
                message: "Post updated ..!",
                profData: profile._doc
            })
        }else{
            res.status(200).json({
                message: "Not updated ..!"
            })
        }
        
    })
})
router.get("/:id", (req, res, next) =>{
    
    Profile.findById(req.params.id).then((profileData) => {
        if(profileData){
            res.status(200).json(profileData)
            //console.log(profBnr)
        }else{
            res.status(200).json({
                message: "Post not found ..!"
            })
        }
    })
})

module.exports = router;