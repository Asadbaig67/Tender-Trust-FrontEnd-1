// import mongoose from "mongoose";
const mongoose = require("mongoose");

const EmailverificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300,
    },
});

const Emailverification = mongoose.model("Emailverification", EmailverificationSchema);

// export default Emailverification;

module.exports = Emailverification;
