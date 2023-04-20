const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    email: String,
    name: String,
    phone: String,
    department:String
});

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;