const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer'); 

const fs = require('fs');
const path = require('path');


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
    },
    loadAllFaqs: function(req,res){

        var faqs = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/faq.json'))); 

        faqs.forEach(faq => {
            if (faq.text.includes("$")){
                let bullets = faq.text.split("$");
                faq.text = faq.text.substr(0, faq.text.indexOf("$"));
                faq.bullets = bullets;
            }else if (faq.text.includes("#")){
                let texts = faq.text.split("#");
                faq.text = texts[0];
                faq.textAlt = texts[1];
            }
        });

     
        return res.render('faq-complete',{questions: faqs});
    },
    applyNow: function(req,res){
        res.render('apply-now');
    }
}