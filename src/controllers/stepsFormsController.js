const fs = require('fs');
const path = require('path');

module.exports = {    
    applyNow: function(req,res){
    
      let lang = null;
      
      
      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }
      
      let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 
      let _footerDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/footer.json')));
      let _applynowDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/apply-now.json')));

      res.render('apply-now',{navbarDat:_navbarDat, langFlag: lang, footerDat: _footerDat, applyNowDat: _applynowDat});
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
      
      let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 
      let _footerDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/footer.json')));

      res.render('prequalify',{navbarDat:_navbarDat, langFlag: lang, footerDat: _footerDat});
    },
    processPrequalify: function(req,res){

    },
}    