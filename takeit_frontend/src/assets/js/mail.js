"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'takeitdotcom@gmail.com',
            pass: 'Takeit2019'
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'takeitdotcom@gmail.com',
        to: 'jfabricioherrerac@gmail.com',
        subject: 'Confirmación de Registro',
        text: 'Has sido registrado exitosamente.'
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);