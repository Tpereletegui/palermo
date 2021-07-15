const fs = require('fs');
const path = require('path');

module.exports = {

  brokersAndRealtors: function(req,res){

    let lang = null;
    
    
    if (req.cookies.lang == undefined){
      lang='eng';
    }else{
      lang=req.cookies.lang;
    }
    
    let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 
    let _footerDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/footer.json'))); 

    res.render('brokers',{navbarDat:_navbarDat, langFlag: lang, footerDat: _footerDat});
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
    let _footerDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/footer.json'))); 
    
    res.render('brokers', {loan: loan, navbarDat: _navbarDat, langFlag: lang,footerDat: _footerDat})
  }
}