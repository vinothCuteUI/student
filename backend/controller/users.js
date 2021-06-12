const User = require("../modules/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: "User created successfully!",
                result:  result
            })
        }).catch(err => {
            res.status(500).json({
                message: "Invalid authentication credentials..!"
                
            })
        })
    })
}

exports.LogIn = (req, res, next) => {
    let fetchUserData;
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            return res.status(401).json({
                message: "Sorry your Email id or Passowerd is invalid..!"
            })
        }
        fetchUserData = user;
        return bcrypt.compare(req.body.password, user.password); 
    })
    .then(result => {
        if(!result){
            return res.status(401).json({
                message: "Sorry your Email id or Passowerd is invalid..!"
            })
        }
        const token = jwt.sign(
            {email: fetchUserData.email, userId: fetchUserData._id}, 
            process.env.JWT_KEY,
            {expiresIn: "1h"}
        )
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId:  fetchUserData._id
        });
    })
    .catch(err => {
        return res.status(401).json({
           message: "Sorry your Email id or Passowerd is invalid..!"
        })
    })
}