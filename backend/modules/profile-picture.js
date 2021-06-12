const mongoose = require("mongoose");

const profilePictureSchema = mongoose.Schema({
    imagePath: { type: String, required: true },
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

module.exports = mongoose.model('Picture', profilePictureSchema);