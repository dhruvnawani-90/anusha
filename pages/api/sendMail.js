const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    host: process.env.ANUSHA_SMTP_HOST,
    port: process.env.ANUSHA_SMTP_PORT,
    auth: {
      user: process.env.ANUSHA_SMTP_USERNAME,
      pass: process.env.ANUSHA_SMTP_PASSWORD
    }
});

export default (async ({to, subject, html}) => {
    let mailDetails = {to, subject, html};
    return new Promise((resolve, reject) => {
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err);
                resolve({
                    success: false,
                    message: "Something went wrong."
                });
            } else {
                console.log(data);
                resolve({
                    success: true,
                    message: "Mail received. We will get back to you shortly."
                });
            }
        });
    });
});