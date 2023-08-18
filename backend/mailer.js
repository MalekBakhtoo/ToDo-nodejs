const nodemailer = require('nodemailer');

function mailer(contact , subject , text) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'todoapp91@gmail.com',
            pass: 'aggjoguzsdngyyyq'
        }
    });

    let mailOptions = {
        from: 'todoapp91@gmail.com',
        to: contact,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = mailer;
