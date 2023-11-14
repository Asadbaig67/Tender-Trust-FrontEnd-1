const User = require('../models/Contractor.js');
const { sendVerificationmail } = require('./Mailer.js');
const Emailverification = require('../models/Emailverification.js');

// User Registration Function
const registration = async (req, res) => {
  try {
    // Deconstructing the request body
    let { name, email, password } =
      req.body;

    // Checking if user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(422).json({ error: "User already exists" });
    }

    const otp = Math.floor(Math.random() * 900000) + 100000;

    // Check if the email is present in the database of email verification
    const useremail = await Emailverification.findOne({ email: email });

    if (useremail) {
      return res.status(409).json({ error: "Email Already Exists" });
    }

    // Create new passwordreset document
    const newUser = new Emailverification({
      email: email,
      otp: otp,
    });


    // Save the new passwordreset document
    await newUser.save();

    // Send the otp to the email
    const sent = await sendVerificationmail(
      email,
      otp,
      name,
      password,
    );

    if (!sent) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json({ message: "Verification Email Sent" });

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registration
} 