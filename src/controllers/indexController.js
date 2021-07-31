const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer'); 
const fs = require('fs');
const path = require('path');
const pdfDocument = require('pdfkit-construct');


module.exports = {
    index: function(req,res,next){

      let lang = null;


      if (req.cookies.lang == undefined){
        lang='eng';
        res.cookie("lang","eng");
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
      let _footerDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/footer.json'))); 
      
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
        langFlag: lang,
        footerDat: _footerDat
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

      let lang = null;


      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }

      let faqs = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/faq.json'))); 
      let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 
      let _footerDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/footer.json'))); 
      let _contactDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/contact-us.json'))); 

    
      return res.render('faq-complete',{questions: faqs, navbarDat: _navbarDat, langFlag: lang, footerDat:_footerDat, contactDat: _contactDat});
    },
    getCalculator: function(req,res){

      let lang = null;


      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }

      let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 
      let _footerDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/footer.json')));
      let _calculatorDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/calculator.json')));
      

      res.render('calculator',{navbarDat:_navbarDat, langFlag: lang, footerDat: _footerDat, calculatorDat: _calculatorDat});
    },
    processCalculator: function(req,res){

      let lang = null;

      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }

      let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 
      let _footerDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/footer.json'))); 
      let _calculatorDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/calculator.json')));

      let _loanAmount = Math.floor(req.body.estimatedValue*(req.body.mortgageAmount/100));
      let _annualPayment = Math.floor(_loanAmount/req.body.mortgageInterest);
      let _monthPayment = Math.floor(_annualPayment/ 12);
      let _loanCostPercent = req.body.estLoanCosts;
      let _estOriginPercent = req.body.estOrigFree;
      let _estimatedValue = Math.floor(req.body.estimatedValue);
      let _mortgageAmount = 100-req.body.mortgageAmount; 
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

      const doc = new pdfDocument();
      doc.pipe(fs.createWriteStream('test.pdf'));


      doc.setDocumentHeader({},()=>{
        doc
        .fontSize(16)
        .text('Loan Details',{
          width: 420,
          align: 'center'
        })
      })


      // Primera fila del header
      doc.addTable([
        {key:'estPValue', label:'Estimated Property Value', align:'center'},
        {key:'dPayment', label:'      Down Payment      ', align:'center'},
        {key:'lAmount', label:'       Loan Amount      ', align:'center'},
        {key:'interest', label:'        Interest        ', align:'center'},
        {key:'term', label:'          Term          ', align:'center'}
      ],[
        {estPValue: "$1500", dPayment: "$8000", lAmount: "$50000", interest:"$1000", term:"150"}
      ],{
        border: null,
        width: 'fill_body',
        headAlign: 'center',
        headBackground: '#ffffff',
       }
      )

      // Segunda fila del header
      doc.addTable([
        {key:'estPValue', label:'Month Interest Payment', align:'center'},
        {key:'dPayment', label:'Annual Interest Payment', align:'center'},
        {key:'lAmount', label:'Est. Loan Costs', align:'center'},
        {key:'interest', label:'Est. Orig. Free', align:'center'},
        {key:'term', label:'Total Closing Costs', align:'center'}
      ],[
        {estPValue: "$1500", dPayment: "$8000", lAmount: "$50000", interest:"$1000", term:"150"}
      ],{
        border: null,
        width: 'fill_body',
        headAlign: 'center',
        headBackground: '#ffffff',
       }
      )

      // Donde se muestran los pagos mensuales
      doc.addTable([
        {key:'id',label:'N°',align:'center'},
        {key:'cumulativePayment',label:'Cumulative Payment',align:'center'}
      ],_payments,
      {
        border: null,
        width: "fill_body",
        striped: true,
        stripedColors: ["#f6f6f6","#d6c4dd"],
        cellsPadding: 10,
        marginLeft: 45,
        marginRight: 45,
        headAlign: 'center'
      })

      doc.render();
      doc.end();

      let output = {
        estimatedValue:  _estimatedValue, //VALOR DE LA CASA COMO VIENE EN INPUT
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
      
      res.render('calculator', {output: output, payments: _payments,navbarDat:_navbarDat, langFlag: lang, footerDat: _footerDat, calculatorDat: _calculatorDat})
    },
    langChange: function(req,res){

      let dire = req.body.hiddenInput;
      console.log('xd: ' + dire);
      
      try {
        if (req.cookies.lang == "eng" ){
          res.cookie("lang","esp");
        }else{
          res.cookie("lang","eng");
        }
        
      } catch (error) {
        console.log(error);
      }
      res.redirect(dire);
  }
}