const fs = require('fs');
const path = require('path');

module.exports = {
    loanPrograms:function(req,res){
      
        let lang = null;  
        
        if (req.cookies.lang == undefined){
          lang='eng';
        }else{
          lang=req.cookies.lang;
        }
        
        let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 
        let _footerDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/footer.json'))); 

        res.render('loan-programs',{navbarDat:_navbarDat, langFlag: lang, footerDat: _footerDat})
    },
    bridgeLoan: function(req,res){

        let lang = null;
        
        
        if (req.cookies.lang == undefined){
          lang='eng';
        }else{
          lang=req.cookies.lang;
        }
        
        let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 
        let _footerDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/footer.json')));
        
        res.render('loan-criteria', {loan:'bridge-loan', title: 'Bridge Loan',navbarDat:_navbarDat, langFlag: lang,
        footerDat: _footerDat})
    },
    fixFlip: function(req,res){

    let lang = null;
    
    
    if (req.cookies.lang == undefined){
        lang='eng';
    }else{
        lang=req.cookies.lang;
    }
    
    let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json')));
    let _footerDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/footer.json'))); 

    res.render('loan-criteria', {loan:'fix-flip', title: 'Rehab / Fix & Flip',navbarDat:_navbarDat, langFlag: lang,
        footerDat: _footerDat})
    },
    cashOut: function(req,res){

    let lang = null;
    
    
    if (req.cookies.lang == undefined){
        lang='eng';
    }else{
        lang=req.cookies.lang;
    }
    
    let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 
    let _footerDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/footer.json'))); 

    res.render('loan-criteria', {loan:'cash-out', title: 'Cash Out / Refinance',navbarDat:_navbarDat, langFlag: lang,
        footerDat: _footerDat})
    },
    rental: function(req,res){

    let lang = null;
    
    
    if (req.cookies.lang == undefined){
        lang='eng';
    }else{
        lang=req.cookies.lang;
    }
    
    let _navbarDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))); 
    let _footerDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/footer.json'))); 
    
    res.render('loan-criteria', {loan:'rental', title: 'Rental Loan',navbarDat:_navbarDat, langFlag: lang,
        footerDat: _footerDat})
    },
}