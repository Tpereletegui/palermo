let btn = document.querySelector('.checkbtn');
let icon = document.querySelector('#icon');
let navbar = document.querySelector('#navbar');
let logo = document.querySelector('.logo');
let links = document.querySelectorAll('.overeable');
let body = document.querySelector('body');
let hiddenNavInput = document.querySelector('#hidden-input-nav');
let locPath = window.location.pathname;
let langIcon = document.querySelector('.lang-button');

btn.addEventListener("click", () =>{
  if (icon.classList.contains('fa-bars')){
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
    body.classList.add('no-scroll');
  }else{
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    body.classList.remove('no-scroll');
  }
})


langIcon.addEventListener('click',()=>{
  hiddenNavInput.setAttribute("value",locPath);
})



if (window.innerWidth > 768){
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 0) {
      navbar.style.height = "60px";
      logo.innerHTML = '<img id="logo-img" src="/images/logos/logo-navbar-landscape.png" alt="" width="160px">'
    }else{
      navbar.style.height = "100px";
      logo.innerHTML = '<img id="logo-img" src="/images/logos/logo-navbar-big.png" style="margin-left: 20px; margin-top:15px;"  alt="" width="100px" >'
    }
  });
}else{
  navbar.style.height = "60px";
  logo.innerHTML = '<img id="logo-img" src="/images/logos/logo-navbar-landscape.png" alt="" width="160px">'
}


if (window.innerWidth <= 768){
  links.forEach(link=>{
    link.addEventListener('click',()=>{
      navbar.style.display = "none";
      body.classList.remove('no-scroll');
    })
  })
}