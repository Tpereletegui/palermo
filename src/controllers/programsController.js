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
            title:"Programs | Palermo Lender",
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
            title: "Bridge Loan | Palermo Lender",
            loanTitle: language._programsDat.programs[0],
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
        title: "Fix and Flip | Palermo Lender",
        loanTitle: language._programsDat.programs[1],
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
            loanTitle: language._programsDat.programs[2],
            title: "Cash Out | Palermo Lender",
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
        title: "Rental Loan | Palermo Lender",
        loanTitle: language._programsDat.programs[3],
        navbarDat:language._navbarDat, 
        langFlag: lang,
        footerDat: language._footerDat, 
        programsDat: language._programsDat})
    },
}