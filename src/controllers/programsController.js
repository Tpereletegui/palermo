const loadLang = require('./loadLangController');

module.exports = {
    loanPrograms:function(req,res){
      
        let lang = null;  
        
        if (req.cookies.lang == undefined){
          lang='eng';
        }else{
          lang=req.cookies.lang;
        }
        let language = loadLang(lang);

        res.render('loan-programs',{
            navbarDat:language._navbarDat, 
            langFlag: lang, 
            footerDat: language._footerDat, 
            programsDat: language._programsDat,
            titlesDat: language._titlesDat
        })
    },
    
    bridgeLoan: function(req,res){

        let lang = null;
        
        
        if (req.cookies.lang == undefined){
          lang='eng';
        }else{
          lang=req.cookies.lang;
        }
        
        let language = loadLang(lang);

        res.render('loan-criteria', {
            loan:'bridge-loan',
            title: language._programsDat.programs[0],
            navbarDat:language._navbarDat, 
            langFlag: lang,
            footerDat: language._footerDat, 
            programsDat:language. _programsDat,
            titlesDat: language._titlesDat
        })
    },

    fixFlip: function(req,res){

    let lang = null;
    
    
    if (req.cookies.lang == undefined){
        lang='eng';
    }else{
        lang=req.cookies.lang;
    }
    let language = loadLang(lang);


    res.render('loan-criteria', {
        loan:'fix-flip', 
        title: language._programsDat.programs[1],
        navbarDat:language._navbarDat, 
        langFlag: lang,
        footerDat: language._footerDat, 
        programsDat: language._programsDat
        })
    },

    cashOut: function(req,res){
        let lang = null;
        if (req.cookies.lang == undefined){
            lang='eng';
        }else{
            lang=req.cookies.lang;
        }
        let language = loadLang(lang);

        res.render('loan-criteria', {
            loan:'cash-out', 
            title: language._programsDat.programs[2],
            navbarDat:language._navbarDat, 
            langFlag: lang,
            footerDat: language._footerDat, 
            programsDat: language._programsDat
        })
    },

    rental: function(req,res){

    let lang = null;
    
    if (req.cookies.lang == undefined){
        lang='eng';
    }else{
        lang=req.cookies.lang;
    }
    let language = loadLang(lang);
    

    res.render('loan-criteria', {
        loan:'rental', 
        title: language._programsDat.programs[3],
        navbarDat:language._navbarDat, 
        langFlag: lang,
        footerDat: language._footerDat, 
        programsDat: language._programsDat})
    },
}