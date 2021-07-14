const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer'); 
const fs = require('fs');
const path = require('path');

module.exports = {
    index: function(req,res,next){

      let lang = null;


      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }

      let _principalDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/principal.json'))); 
      let _whyusDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/whyus.json'))); 
      let _aboutusDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/aboutus.json'))); 
      let _recentdealsDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/recent-deals.json'))); 
      let _loanprogramDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/loan-program-section.json'))); 
      let _testimonialDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/testimonials.json'))); 
      let _faqSectionDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/faq-section.json'))); 
      let _faqsDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/faq.json'))); 
      let _contactDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/contact-us.json'))); 
      let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 
      
      res.render('index',{
        principalDat: _principalDat, 
        whyusDat: _whyusDat, 
        aboutusDat:_aboutusDat, 
        recentdealsDat:_recentdealsDat, 
        loanprogramDat:_loanprogramDat, 
        testimonialDat:_testimonialDat, 
        faqSectionDat: _faqSectionDat,
        faqsDat: _faqsDat,
        contactDat: _contactDat,
        navbarDat:_navbarDat,
        langFlag: lang
      });
    },
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

      let faqs = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/faq.json'))); 

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
    
      let lang = null;
      
      
      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }
      
      let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 
      res.render('apply-now',{navbarDat:_navbarDat, langFlag: lang});
    },
    processApplyNow: function(req,res){
    
      

    },
    getCalculator: function(req,res){
      res.render('calculator');
    },
    processCalculator: function(req,res){

      let _loanAmount = Math.floor(req.body.estimatedValue*(req.body.mortgageAmount/100));
      let _annualPayment = Math.floor(_loanAmount/req.body.mortgageInterest);
      let _monthPayment = Math.floor(_annualPayment/ 12);
      let _loanCostPercent = req.body.estLoanCosts;
      let _estOriginPercent = req.body.estOrigFree;
      let _estimatedValue = Math.floor(req.body.estimatedValue);
      let _mortgageAmount = req.body.mortgageAmount; 
      let _mortgageInterest = req.body.mortgageInterest;
      let _mortgageTenor =  req.body.mortgageTenor;

      let _payments = []
      let _cumulativePayment = 0;
      for (let i = 0; i < _mortgageTenor; i++) {

        _cumulativePayment+= _monthPayment;
        _id = i+1;
        _payments.push({
          id: _id,
          cumulativePayment: _cumulativePayment
        })
      }


      let output = {
        estimatedValue: _estimatedValue, //VALOR DE LA CASA COMO VIENE EN INPUT
        mortgageAmount: _mortgageAmount, //PORCENTAJE DE PRESTAMO COMO VIENE
        loanAmount: _loanAmount,
        mortgageInterest: _mortgageInterest, // TAL COMO VIENE 
        mortgageTenor: _mortgageTenor, // TAL COMO VIENE
        annualInterest: _annualPayment,
        monthInterest: _monthPayment, 
        loanCostPercent: _loanCostPercent, // TAL COMO VIENE
        estOrigPercent: _estOriginPercent, // TAL COMO VIENE
        estLoanCosts: _loanAmount/_loanCostPercent, // % DEL LOAN AMOUNT
        estOrigFree: _loanAmount/_estOriginPercent, // % DEL LOAN AMOUNT 
        totalClosing: (_loanAmount/req.body.estLoanCosts) + (_loanAmount/req.body.estOrigFree), // estLoanCost+ estOrignFree
        payments: _payments
      }
      
      res.render('calculator', {output: output, payments: _payments})
    },
    bridgeLoan: function(req,res){

      let lang = null;
      
      
      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }
      
      let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 

      res.render('loan-criteria', {loan:'bridge-loan', title: 'Bridge Loan',navbarDat:_navbarDat, langFlag: lang})
    },
    fixFlip: function(req,res){

      let lang = null;
      
      
      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }
      
      let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 

      res.render('loan-criteria', {loan:'fix-flip', title: 'Rehab / Fix & Flip',navbarDat:_navbarDat, langFlag: lang})
    },
    cashOut: function(req,res){

      let lang = null;
      
      
      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }
      
      let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 


      res.render('loan-criteria', {loan:'cash-out', title: 'Cash Out / Refinance',navbarDat:_navbarDat, langFlag: lang})
    },
    rental: function(req,res){

      let lang = null;
      
      
      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }
      
      let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 

      res.render('loan-criteria', {loan:'rental', title: 'Rental Loan',navbarDat:_navbarDat, langFlag: lang})
    },
    brokersAndRealtors: function(req,res){

      let lang = null;
      
      
      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }
      
      let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 

      res.render('brokers',{navbarDat:_navbarDat, langFlag: lang});
    },
    loanPrograms:function(req,res){
      
      
      let lang = null;
      
      
      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }
      
      let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 

      res.render('loan-programs',{navbarDat:_navbarDat, langFlag: lang})
    },
    loanSelect: function(req,res){
      let loan = req.body.brokerOption;
      
      let lang = null;
      
      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }
      
      let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 
      
      
      res.render('brokers', {loan: loan, navbarDat: _navbarDat, langFlag: lang})
    },
    langChange: function(req,res){

      try {
        if (req.cookies.lang == undefined){
          res.cookie("lang","eng");
        } else if (req.cookies.lang == "eng" ){
          res.cookie("lang","esp");
        } else {
          res.cookie("lang", "eng")
        }
        
      } catch (error) {
        console.log(error);
      }
      res.redirect('/')
    }
}