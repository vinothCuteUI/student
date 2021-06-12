const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const ProfileBnr = require("../modules/profile-banner");
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
        cb(error, "backend/images/profile-banner");
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase().split(' ').join("-");
        const exts = MIME_TYPE_MAP[file.mimetype];
        cb(null, filename + '-' + Date.now() + '.' + exts);
    }
})
router.post("", checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const profBnr = new ProfileBnr({
        imagePath: url + "/images/profile-banner/" + req.file.filename,
        creator: req.userData.userId
    })
    profBnr.save().then((createProfileBnr) => {
        res.status(201).json({
            message: "post added successfully",
            // postId: createPost.id
            profBnr: {
                ...createProfileBnr,
                id:  createProfileBnr._id,
                imagePath:  createProfileBnr.imagePath,
                creator:  createProfileBnr.creator
            }
        })
    })
})

router.get("",(req, res, next) => {
    
    ProfileBnr.find().then((datas) => {
        res.status(200).json({
            message: "Post fetched successfully",
            profileBnr: datas
        });
    })

    
})


router.put("/:id", checkAuth, multer({storage: storage}).single("image"), (req, res, next) =>{
    let imagePath;
    let curid = mongoose.Types.ObjectId.isValid(req.params.id);
    //console.log(curid)
    if(req.file){
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/profile-banner/" + req.file.filename
    }
    const profBnr = new ProfileBnr({
        _id: req.body.id,
        imagePath: imagePath,
        creator: req.userData.userId
    })
    ProfileBnr.updateOne({_id: req.params.id, creator: req.userData.userId}, profBnr).then((result) => {
        //console.log(result)
        if(result.nModified > 0){
            res.status(200).json({
                message: "Post updated ..!",
                bnrData: profBnr._doc
            })
        }else{
            res.status(200).json({
                message: "Not updated ..!"
            })
        }
        
    })
})
router.get("/:id", (req, res, next) =>{
    ProfileBnr.findById(req.params.id).then((profBnr) => {
        if(profBnr){
            res.status(200).json(profBnr)
           // console.log(profBnr)
        }else{
            res.status(200).json({
                message: "Post not found ..!"
            })
        }
    })
})

module.exports = router;