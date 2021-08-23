const { validationResult } = require('express-validator');
const loadLang = require('./loadLangController');
const nodemailer = require('nodemailer'); 
const fs = require('fs');
const PDFprinter = require('pdfmake');
const axios = require('axios');


/* PDF MAKE */
const fonts = {
	Roboto: {
		normal: Buffer.from(
      require("pdfmake/build/vfs_fonts.js").pdfMake.vfs["Roboto-Regular.ttf"],"base64"
    ),
		bold: Buffer.from(
      require("pdfmake/build/vfs_fonts.js").pdfMake.vfs["Roboto-Regular.ttf"],"base64"
    ),
		italics: Buffer.from(
      require("pdfmake/build/vfs_fonts.js").pdfMake.vfs["Roboto-Regular.ttf"],"base64"
    ),
		bolditalics: Buffer.from(
      require("pdfmake/build/vfs_fonts.js").pdfMake.vfs["Roboto-Regular.ttf"],"base64"
    )
	}
};

const styles = {
  header: {
    fontSize: 18,
    bold: true,
    margin: [0, 0, 0, 10],
    alignment: 'center'
  },
  subHeader: {
    fontSize: 12,
    bold: true,
    margin: [0, 10, 0, 5],
    alignment: 'center',
    color: '#DBB90F'
  },
  preLoanDetails:{
    fontSize: 12,
    bold: true,
    margin: [0, 10, 0, 5],
  },
  preLoanPayments:{
    fontSize: 12,
    bold: true,
    margin: [0, 10, 0, 5],
  },
  tableLoanDetails: {
    margin: [0, 5, 0, 15],
    alignment: 'center',
  },
  tablePayments: {
    alignment: 'center',
    margin: [0, 5, 0, 15],
  },
  tableOpacityExample: {
    fontSize: 12,
    margin: [0, 5, 0, 15],
    fillColor: 'blue',
    fillOpacity: 0.3,
    alignment: 'center'
  },
  tableHeader: {
    bold: true,
    fontSize: 8,
    color: 'black',
    fillColor: '#DBB90F',
    fillOpacity: 0.8,
    alignment: 'center'
  },
  paymentTableHeader:{
    alignment: 'center',
    bold: true,
    fillColor: '#093147',
    fillOpacity: 0.8,
    fontSize: 8,
    color: 'white'
  },
  paymentDate: {
    bold: false,
    fontSize: 10,
    color: 'black',
    alignment: 'center'
  },
  tableFooter: {
    bold: false,
    fontSize: 6,
    color: 'black',
    alignment: 'center'
  }
}
/* Format number */
const moneyFormat = new Intl.NumberFormat('en-US',{
  style:'currency',
  currency:'USD',
})




module.exports = {
  index: async function(req,res){

    let lang = null;
    if (req.cookies.lang == undefined){
      lang='eng';
      res.cookie("lang","eng");
    }else{
      lang=req.cookies.lang;
    }
    let language = loadLang(lang);

    let apiKey = 'AIzaSyDAFtKXjhSeh9Q9syCuSs3l0lEjmQsEVK0';
    let placeID = 'ChIJJZfUlGDMyWQRJs3wVWApGrU'

     

    let { data } = await axios.get('https://maps.googleapis.com/maps/api/place/details/json?place_id='+placeID+'&key='+apiKey)
    

    res.render('index',{
      principalDat: language._principalDat, 
      whyusDat: language._whyusDat, 
      aboutusDat:language._aboutusDat, 
      recentdealsDat:language._recentdealsDat, 
      loanprogramDat:language._loanprogramDat, 
      testimonialDat:language._testimonialDat, 
      faqSectionDat: language._faqSectionDat,
      faqsDat: language._faqsDat,
      contactDat: language._contactDat,
      navbarDat:language._navbarDat,
      langFlag: lang,
      footerDat: language._footerDat,
      reviews: data.result.reviews
    });
  },

  message: async function(req, res) {
    /* let errors = validationResult(req);
    
    if (errors.isEmpty()){
      
      
    }else{
      res.render("index",{errors:errors.message});
    } */
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "mail.palermolender.com",
      port: 26,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "mail@palermolender.com", 
        pass: "plender-techgroup-$23082021", 
      },
      tls:{
        rejectUnauthorized: false
      }
    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: req.body.name+'<'+req.body.email+'>', // sender address
        to: "maxincolla@gmail.com", // list of receivers
        subject: "Palermo Lender - Contact Message", // Subject line
        text: req.body.message, // plain text body
        html: "<b>"+req.body.message+"</b>", // html body
    });    

      
    res.redirect('/');
  },

  loadAllFaqs: function(req,res){ 

    let lang = null;
    if (req.cookies.lang == undefined){
      lang='eng';
    }else{
      lang=req.cookies.lang;
    }
    let language = loadLang(lang);


    return res.render('faq-complete',{
      questions: language._faqsDat, 
      navbarDat: language._navbarDat, 
      langFlag: lang, 
      footerDat:language._footerDat, 
      contactDat: language._contactDat,
      titlesDat: language._titlesDat
    });
  },

  langChange: function(req,res){

    let dire = req.body.hiddenInput;
    
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
  },
}