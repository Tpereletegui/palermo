const aboutusFooter = document.querySelector('#footer-aboutus-link');
const contactFooter = document.querySelector('#footer-contact-link');
const faqFooter = document.querySelector('#footer-faq-link');
const testimonialsFooter = document.querySelector('#footer-testimonials-link');
const brokersFooter = document.querySelector('#footer-brokers-link');

const applyNowFooter = document.querySelector('#footer-applynow-link');
const prequalifyFooter = document.querySelector('#footer-prequalify-link');
const calculatorFooter = document.querySelector('#footer-calculator-link');


if (window.location.pathname == '/'){
    aboutusFooter.addEventListener("click",()=>{
        aboutusSection.scrollIntoView(options)
    })

    contactFooter.addEventListener("click",()=>{
        contactSection.scrollIntoView(options)
    })

    faqFooter.addEventListener("click",()=>{
        faqSection.scrollIntoView(options)
    })

    testimonialsFooter.addEventListener("click",()=>{
        testimonialsSection.scrollIntoView(options)
    })

    applyNowFooter.setAttribute("href","/apply-now");
    prequalifyFooter.setAttribute("href","/prequalify");
    calculatorFooter.setAttribute("href","/calculator");
    
}else{
    aboutusFooter.setAttribute("href","/");
    contactFooter.setAttribute("href","/");
    faqFooter.setAttribute("href","/");
    testimonialsFooter.setAttribute("href","/");
}