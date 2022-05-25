const fs = require('fs');
const path = require('path');


const loadLang = (lang) =>{
    return {
        _titles: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/titles.json'))),
        _principalDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/principal.json'))),
        _whyusDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/whyus.json'))),
        _aboutusDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/aboutus.json'))),
        _recentdealsDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/recent-deals.json'))),
        _loanprogramDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/loan-program-section.json'))),
        _testimonialDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/testimonials.json'))),
        _faqSectionDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/faq-section.json'))),
        _faqsDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/faq.json'))),
        _contactDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/contact-us.json'))),
        _navbarDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/navbar.json'))),
        _footerDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/footer.json'))),
        _titlesDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/titles.json'))),
        _programsDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/loan-program.json'))),
        _calculatorDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/calculator.json'))),
        _brokersDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/brokers.json'))),
        _applyNowDat: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/eng/apply-now.json'))),
    }
}

module.exports = loadLang;