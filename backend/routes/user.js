const express = require("express");
const router = express.Router();
const UserAcces = require("../controller/users");

router.post("/signup", UserAcces.createUser)

router.post("/login", UserAcces.LogIn)

module.exports = router;