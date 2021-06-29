const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer'); 
const Swal = require('sweetalert2');

module.exports = {
    message: function(req, res, next) {
        

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: "b87d625d652af5", // generated ethereal user
            pass: "4c8642e68cd325", // generated ethereal password
            },
        });

        // send mail with defined transport object
        return transporter.sendMail({
            from: req.body.name+'<'+req.body.email+'>', // sender address
            to: "maxincolla@gmail.com", // list of receivers
            subject: "Palermo Lender - Contact Message", // Subject line
            text: req.body.message, // plain text body
            html: "<b>"+req.body.message+"</b>", // html body
        }, (err, info) =>{
            if (err){
                res.render("index", {errors:err})
            }else{
               alert('mensaje enviado');
               res.redirect('/');
            } 

            
        });

        /* let errors = validationResult(req);
        if (errors.isEmpty()){

            


        }else{
            res.render("index", {errors:errors.errors})
        }
         */
    }
}