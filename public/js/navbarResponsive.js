let btn = document.querySelector('.checkbtn');
    let icon = document.querySelector('#icon');
    let overlayNav = document.querySelector('.fade-navbar');
    let navbar = document.querySelector('#navbar');
    let logo = document.querySelector('.logo');
    let links = document.querySelectorAll('.overeable');
    let body = document.querySelector('body');

    btn.addEventListener("click", () =>{
      if (icon.classList.contains('fa-bars')){
        overlayNav.style.display = "block";
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        body.classList.add('no-scroll');
      }else{
        overlayNav.style.display = "none";
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        body.classList.remove('no-scroll');
      }
    })
    

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 100) {
        navbar.classList.add('scroll-fade');
        logo.innerHTML = '<img id="logo-img" src="/images/logos/logo-navbar-landscape.png" alt="" width="160px">'
        if (window.innerWidth > 768){
          links.forEach(link =>{
            link.style.color="gray";
          })
        }
      }else{
        navbar.classList.remove('scroll-fade');
        logo.innerHTML = '<img id="logo-img" src="/images/logos/logo-navbar-big-alt.png" style="margin-left: 20px; margin-top:15px;"  alt="" width="100px" >'
        if (window.innerWidth > 768){
          links.forEach(link =>{
            link.style.color="white";
          })
        }
      }
    });