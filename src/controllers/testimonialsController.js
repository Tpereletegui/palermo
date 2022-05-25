const loadLang = require('./loadLangController');
const axios = require('axios');


module.exports = {

  dealsTestimonials:async function(req,res){

    let lang = null;
    if (req.cookies.lang == undefined){
      lang='eng';
    }else{
      lang=req.cookies.lang;
    }
    let language = await loadLang(lang);
    let apiKey = 'AIzaSyDAFtKXjhSeh9Q9syCuSs3l0lEjmQsEVK0';
    let placeID = 'ChIJJZfUlGDMyWQRJs3wVWApGrU'
    let { data } = await axios.get('https://maps.googleapis.com/maps/api/place/details/json?place_id='+placeID+'&key='+apiKey);
    console.log('data', data)
    
    
    res.render('deals',{
      title: "Deals | Palermo Lender",
      navbarDat:language._navbarDat, 
      langFlag: lang, 
      footerDat: language._footerDat,
      titlesDat: language._titlesDat,
      recentdealsDat:language._recentdealsDat, 
      testimonialDat:language._testimonialDat, 
      reviews: data.result.reviews
    });
  
  }
}