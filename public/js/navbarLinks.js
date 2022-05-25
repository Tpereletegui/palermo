const aboutusLink = document.querySelector("#aboutus-link");
const aboutusSection = document.querySelector("#aboutus-section");
const programsLink = document.querySelector("#programs-link")
const programsSection = document.querySelector("#programs-section");
const dealsLink = document.querySelector("#deals-link")
const dealsSection = document.querySelector("#recent-deals-section");
const testimonialsLink = document.querySelector("#testimonials-link")
const testimonialsSection = document.querySelector("#testimonials-section");
const brokersLink = document.querySelector("#brokers-link")
const brokersSection = document.querySelector("#brokers-section");
const faqLink = document.querySelector("#faq-link")
const faqSection = document.querySelector(".section-faq");
const contactLink = document.querySelector("#contact-link")
const contactSection = document.querySelector("#contact-section");
const options = {block: "center",behavior: "smooth"}

if (window.location.pathname == '/'){
    aboutusLink.addEventListener("click",()=>{
        aboutusSection.scrollIntoView(options)
    })
    programsLink.addEventListener("click",()=>{
        programsSection.scrollIntoView(options)
    })
    dealsLink.addEventListener("click",()=>{
        dealsSection.scrollIntoView(options)
    })
    testimonialsLink.addEventListener("click",()=>{
        testimonialsSection.scrollIntoView(options)
    })
    brokersLink.addEventListener("click",()=>{
        brokersSection.scrollIntoView(options)
    })
    faqLink.addEventListener("click",()=>{
        faqSection.scrollIntoView(options)
    })
    contactLink.addEventListener("click",()=>{
        contactSection.scrollIntoView(options)
    })
}else{
    aboutusLink.setAttribute("href","/");
    programsLink.setAttribute("href","/programs");
    dealsLink.setAttribute("href","/");
    testimonialsLink.setAttribute("href","/");
    brokersLink.setAttribute("href","/brokers");
    faqLink.setAttribute("href","/faq");
    contactLink.setAttribute("href","/");
}