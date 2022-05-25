const nodemailer = require('nodemailer'); 


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: "mail.palermolender.com",
    port: 26,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "mails@palermolender.com", 
      pass: "plender-techgroup-$23082021", 
    },
    requireTLS:true,
    tls:{
      rejectUnauthorized: false
    }
});

module.exports = transporter;