const contactForm = document.querySelector('.form-message');
const contactFormInputs = document.querySelectorAll('.form-message input');


const rules = {
    user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/ // 7 a 14 numeros.
}


const contactFormValidate = (e) =>{
    const event = e.target;

    switch(event.name){
        case 'name':
            if (!rules.name.test(event.value) || event.value.length == 0){
                document.querySelector('.form-group-name').classList.add('form-group-error');
            }else{
                document.querySelector('.form-group-name').classList.remove('form-group-error');
            }
        
            break;
        
        case 'email':
            if (!rules.email.test(event.value) || event.value.length == 0){
                document.querySelector('.form-group-email').classList.add('form-group-error');
            }else{
                document.querySelector('.form-group-email').classList.remove('form-group-error');
            }
            break;

        case 'message':
            if (event.value.length == 0){
                document.querySelector('.form-group-message').classList.add('form-group-error');
            }else{
                document.querySelector('.form-group-message').classList.remove('form-group-error');
            }
            
            break;

    }
}


contactFormInputs.forEach(input => {
    input.addEventListener('keyup',contactFormValidate);
    input.addEventListener('keyup',contactFormValidate);
})

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
})