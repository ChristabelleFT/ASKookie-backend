const nodemailer = require('nodemailer')
require("dotenv").config();
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

exports.sendEmail = (data, callBack) => {
    transporter.sendMail(data, (err, info, response) => {
        return callBack(err, info, response)
    })
}