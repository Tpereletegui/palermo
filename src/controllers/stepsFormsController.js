const loadLang = require('./loadLangController');

module.exports = {    
    applyNow: function(req,res){
    
      let lang = null;
      
      
      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }
      let language = loadLang(lang);
      

      res.render('multiple-step-form',{
        navbarDat:language._navbarDat, 
        langFlag: lang, 
        footerDat: language._footerDat, 
        mode: 'apply' , 
        title:language._applynowDat.title,  
        applyNowDat: language._applynowDat
      });
    },
    processApplyNow: function(req,res){
      
    },
    prequalify: function(req,res){
    
      let lang = null;
      
      
      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }
      let language = loadLang(lang);


      res.render('multiple-step-form',{
        navbarDat:language._navbarDat, 
        langFlag: lang, 
        footerDat: language._footerDat, 
        mode: 'pre',
        title:language._applynowDat.titlePreq,
        applyNowDat: language._applynowDat
      });
    },
    processPrequalify: function(req,res){

    },
}    