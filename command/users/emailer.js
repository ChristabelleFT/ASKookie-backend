const nodemailer = require('nodemailer')
require("dotenv").config();
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

let mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'christabelle.ft@gmail.com',
    subject: 'test nodemailer',
    text: 'email confirmation'
}

exports.sendEmail = (data, callBack) => {
    transporter.sendMail(mailOptions, (err, info, response) => {
        return callBack(err, info, response)
    })
}

//create token for verification
        // jwt.sign(
        //     {
        //         user: body.username,
        //     },
        //     body.email,
        //     {
        //         expiresIn: '1d',
        //     },
        //     (err, emailToken) => {
        //         const url = `http://localhost:3000/confirmation/${emailToken}`;

        //         transporter.sendMail({
        //             to: args.email,
        //             subject: 'ASKookie Email Confirmation',
        //             html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
        //         });
        //     },
        // );

        // try {
        //     const {user:{id}} = jwt.verify(req.params.token)
        // }