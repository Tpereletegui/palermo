const loadLang = require('./loadLangController');


module.exports = {

  brokersAndRealtors: function(req,res){

    let lang = null;
    if (req.cookies.lang == undefined){
      lang='eng';
    }else{
      lang=req.cookies.lang;
    }
    let language = loadLang(lang);
    

    res.render('brokers',{
      navbarDat:language._navbarDat, 
      langFlag: lang, 
      footerDat: language._footerDat,
      brokersDat: language._brokersDat, 
      programsDat: language._programsDat,
      titlesDat: language._titlesDat
    });
  },
  
  loanSelect: function(req,res){
    let loan = req.body.brokerOption;
    let lang = null;
    if (req.cookies.lang == undefined){
      lang='eng';
    }else{
      lang=req.cookies.lang;
    }
    let language = loadLang(lang);

    res.render('brokers', {
      loan: loan, 
      navbarDat: language._navbarDat, 
      langFlag: lang,
      footerDat: _footerDat,
      brokersDat: language._brokersDat, 
      programsDat: language._programsDat
    })
  }
}