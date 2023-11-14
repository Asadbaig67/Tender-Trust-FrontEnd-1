// import mongoose from "mongoose";
// import bcryptjs from "bcryptjs";
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Contractor",
  },
});

// password hashing
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
    // this.c_password = await bcryptjs.hash(this.c_password, 12);
  }
  next();
});

// generating token
UserSchema.methods.generatetoken = async function () {
  try {
    let tokenValue = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: tokenValue });
    await this.save();
    return tokenValue;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("Users", UserSchema);

// export default Contractor;

module.exports = User;
