let btn = document.querySelector('.checkbtn');
let navState = document.querySelector('#check');
let icon = document.querySelector('#icon');
let navbar = document.querySelector('#navbar');
let logo = document.querySelector('.logo');
let links = document.querySelectorAll('.overeable');
let body = document.querySelector('body');
let hiddenNavInput = document.querySelector('#hidden-input-nav');
let locPath = window.location.pathname;
let langIcon = document.querySelector('.lang-button');
let principalSection = document.querySelector('.section-principal');

/* BOTÓN QUE ABRE EL NAV RESPONSIVE */
btn.addEventListener("click", () =>{
  if (navState.checked==false){
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
    body.classList.add('no-scroll');
  }else{
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    body.classList.remove('no-scroll');
  }
})

/* MANTENER LA DIRECCIÓN AL CAMBIAR DE IDIOMA */
langIcon.addEventListener('click',()=>{
  hiddenNavInput.setAttribute("value",locPath);
})


/* AJUSTE NAVBAR CUANDO HACEMOS SCROLL */
if (window.innerWidth > 768){
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 0) {
      if (principalSection){
        principalSection.style.marginTop = "60px";
      }
      navbar.style.height = "60px";
      logo.innerHTML = '<img id="logo-img" src="/images/logos/logo-navbar-landscape.png" alt="" width="160px">'
    }else{
      if (principalSection){
        principalSection.style.marginTop = "100px";
      }
      navbar.style.height = "100px";
      logo.innerHTML = '<img id="logo-img" src="/images/logos/logo-navbar-big.png" style="margin-left: 20px; margin-top:15px;"  alt="" width="100px" >'
    }
  });

}else{
  navbar.style.height = "60px";
  logo.innerHTML = '<img id="logo-img" src="/images/logos/logo-navbar-landscape.png" alt="" width="160px">'
}


/* CUANDO HACEMOS CLICK EN ALGÚN LINK, QUE SE CIERRE EL NAV */
if (window.innerWidth <= 768){
  links.forEach(link=>{
    link.addEventListener('click',()=>{
      body.classList.remove('no-scroll');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
      navState.checked = false;
    })
  })
}



/* AJUSTES RESPONSIVE HOME */
if (window.innerWidth <=576){
  document.querySelector('.faq-title-label').innerHTML='FAQ';
}