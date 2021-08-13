const fs = require('fs');
const path = require('path');


const loadLang = (lang) =>{
    return {
        _titles: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/titles.json'))),
        _principalDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/principal.json'))),
        _whyusDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/whyus.json'))),
        _aboutusDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/aboutus.json'))),
        _recentdealsDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/recent-deals.json'))),
        _loanprogramDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/loan-program-section.json'))),
        _testimonialDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/testimonials.json'))),
        _faqSectionDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/faq-section.json'))),
        _faqsDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/faq.json'))),
        _contactDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/contact-us.json'))),
        _navbarDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/navbar.json'))),
        _footerDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/footer.json'))),
        _titlesDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/titles.json'))),
        _programsDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/loan-program.json'))),
        _calculatorDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/calculator.json'))),
        _brokersDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/brokers.json'))),
        _applyNowDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/apply-now.json'))),
    }
}

module.exports = loadLang;