// import nodemailer from 'nodemailer';
// import Mailgen from 'mailgen';
const nodemailer = require('nodemailer');
const { Mailgen } = require('mailgen');

// Send Demo Email
const SendEmail = async (data) => {
   try {

      let config = {
         service: "gmail",
         auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
         },
      };
      const transporter = nodemailer.createTransport(config);

      let Mailgenerator = new Mailgen({
         theme: 'salted',
         product: {
            name: 'Desalis Hotels',
            link: 'http://localhost:3000',
         }
      });

      const newemail = {
         body: {
            name: data.name,
            intro: data.message,
            outro: 'This email was sent from Desalis Hotels. Please do not reply to this email.\n Need help, or have questions? Just contact us info@desalishotels.com we are always here to help you '
         }
      };

      let mail = Mailgenerator.generate(newemail);

      let newmessage = {
         from: "Desalis " + process.env.EMAIL,
         to: data.email,
         subject: data.subject,
         html: mail
      }

      transporter.sendMail(newmessage, (err, info) => {
         if (err) {
            return { status: 500, message: "Internal Server Error" }
         } else {
            return { status: 200, message: "Email Sent Successfully" }
         }
      });

   } catch (error) {
      return { status: 500, message: "Internal Server Error" }
   }
};


module.exports = { SendEmail };