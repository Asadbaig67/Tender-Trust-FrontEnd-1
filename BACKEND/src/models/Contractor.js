// import mongoose from "mongoose";
// import bcryptjs from "bcryptjs";
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const contractorSchema = new mongoose.Schema({
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
});

// password hashing
contractorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
    // this.c_password = await bcryptjs.hash(this.c_password, 12);
  }
  next();
});

// generating token
contractorSchema.methods.generatetoken = async function () {
  try {
    let tokenValue = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: tokenValue });
    await this.save();
    return tokenValue;
  } catch (error) {
    console.log(error);
  }
};

const Contractor = mongoose.model("CONTRACTOR", contractorSchema);

// export default Contractor;

module.exports = Contractor;
