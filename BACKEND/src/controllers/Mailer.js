const nodemailer = require('nodemailer');
// const { Mailgen } = require('mailgen');
const Mailgen = require('mailgen');





// Send Email Verification Link
const sendVerificationmail = async (email, otp, name, password) => {
    try {
        const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

        let config = {
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        };
        const transporter = nodemailer.createTransport(config);

        let Mailgenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Email Verification',
                link: 'https://mailgen.js/',
            }
        });

        let verificationObj = { email, name, password, otp };
        console.log(verificationObj);
        let encodedObj = encodeURIComponent(JSON.stringify(verificationObj));
        console.log(encodedObj);
        const link = `${baseUrl}/email/verify?verifyemail=${encodedObj}`;

        const newemail = {
            body: {
                name: name,
                intro: 'Welcome to Tender Trust! Thank You For Creating Account.',
                action: {
                    instructions: 'To Verify Your Email, please click here:',
                    button: {
                        color: '#22BC66',
                        text: 'Confirm Account',
                        link: link
                    }
                },
                outro: 'Need help, or have questions? Just contact infoattendertrust@tendertrust.com.'
            }
        };

        let mail = Mailgenerator.generate(newemail);

        let newmessage = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Confirm Account',
            html: mail
        }

        await transporter.sendMail(newmessage);
        return { status: true, message: "Email Sent Successfully" };
    } catch (error) {
        console.error(error);
        if (error.code === 'ECONNREFUSED') {
            return { status: false, message: "Failed to connect to email server" };
        } else {
            return { status: false, message: "An unknown error occurred while sending the email" };
        }
    }
};


module.exports = { sendVerificationmail };