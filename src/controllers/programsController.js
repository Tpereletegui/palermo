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
        let _programsDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/loan-program.json'))); 

        res.render('loan-programs',{navbarDat:_navbarDat, langFlag: lang, footerDat: _footerDat, programsDat: _programsDat})
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
        let _programsDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/loan-program.json'))); 
        

        res.render('loan-criteria', {loan:'bridge-loan', title: _programsDat.programs[0],navbarDat:_navbarDat, langFlag: lang,
        footerDat: _footerDat, programsDat: _programsDat})
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
    let _programsDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/loan-program.json'))); 


    res.render('loan-criteria', {loan:'fix-flip', title: _programsDat.programs[1],navbarDat:_navbarDat, langFlag: lang,
        footerDat: _footerDat, programsDat: _programsDat})
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
    let _programsDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/loan-program.json'))); 


    res.render('loan-criteria', {loan:'cash-out', title: _programsDat.programs[2],navbarDat:_navbarDat, langFlag: lang,
        footerDat: _footerDat, programsDat: _programsDat})
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
    let _programsDat = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/loan-program.json'))); 
    

    res.render('loan-criteria', {loan:'rental', title: _programsDat.programs[3],navbarDat:_navbarDat, langFlag: lang,
        footerDat: _footerDat, programsDat: _programsDat})
    },
}