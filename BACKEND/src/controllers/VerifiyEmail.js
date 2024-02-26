const Emailverification = require('../models/Emailverification.js');
const User = require('../models/Contractor.js');
const { SendEmail } = require('../utils/Email/SendEmail.js');

// Verify Email From The Link Fucntion
const Emailverify = async (req, res) => {
  // Get the email and otp from the request query
  const verifyemail = req.query.verifyemail;
  const decodedObj = JSON.parse(decodeURIComponent(verifyemail));

  // Destructuring the decoded object
  const { email, otp, name, password } =
    decodedObj;

  // Find the user in the ResetPasswordOtp database
  const userVerify = await Emailverification.findOne({ email: email });
  // Check if the user exists ,If not exists it means the otp is expired
  if (!userVerify)
    return res.status(400).json({ error: "OTP Expired! Please Retry" });
  // Check if the otp is correct
  console.log(userVerify.otp, otp);
  // if (userVerify.otp !== otp) {
  //   return res.status(400).json({ error: "Invalid OTP" });
  // }

  // creating new user
  const new_contractor = new User({
    name,
    email,
    password,
  });

  // saving new user
  await new_contractor.save();
  // Send Email For Successfull Registration
  let data = {
    email: email,
    name: name,
    subject: "Registration Successfull",
    message: "Welcome to Desalis! Thank You For Creating Account.\n Your Email Verification is Successfull"
  };

  await SendEmail(data);
  // Return Success Message
  
  return res.redirect("http://localhost:3000/login");

};



module.exports = { Emailverify };
