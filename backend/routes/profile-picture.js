const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const ProfilePicture = require("../modules/profile-picture");
const checkAuth = require("../middleware/check-auth");


const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mim type");
        if(isValid){
            error = null
        }
        cb(error, "backend/images/profile-picture");
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase().split(' ').join("-");
        const exts = MIME_TYPE_MAP[file.mimetype];
        cb(null, filename + '-' + Date.now() + '.' + exts);
    }
})
router.post("", checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const profPicture = new ProfilePicture({
        imagePath: url + "/images/profile-picture/" + req.file.filename,
        creator: req.userData.userId
    })
    profPicture.save().then((createProfile) => {
        res.status(201).json({
            message: "Picture added successfully",
            // postId: createPost.id
            profPicture: {
                ...createProfile,
                id:  createProfile._id,
                imagePath:  createProfile.imagePath,
                creator:  createProfile.creator
            }
        })
    })
})

router.get("",(req, res, next) => {
    
    ProfilePicture.find().then((datas) => {
        res.status(200).json({
            message: "Post fetched successfully",
            profilePicture: datas
        });
    })

    
})


router.put("/:id", checkAuth, multer({storage: storage}).single("image"), (req, res, next) =>{
    let imagePath;
    
    if(req.file){
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/profile-picture/" + req.file.filename
    }
    const profPicture = new ProfilePicture({
        _id: req.body.id,
        imagePath: imagePath,
        creator: req.userData.userId
    })
    ProfilePicture.updateOne({_id: req.params.id, creator: req.userData.userId}, profPicture).then((result) => {
        //console.log(result)
        if(result.n > 0){
            res.status(200).json({
                message: "Picture updated ..!",
                pictrData: profPicture._doc
            })
        }else{
            res.status(401).json({
                message: "Not updated ..!"
            })
        }
        
    })
})
router.get("/:id", (req, res, next) =>{
    ProfilePicture.findById(req.params.id).then((profPicture) => {
        if(profPicture){
            res.status(200).json(profPicture)
            //console.log(profBnr)
        }else{
            res.status(200).json({
                message: "Profile not found ..!"
            })
        }
    })
})

module.exports = router;