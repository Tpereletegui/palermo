const contactForm = document.querySelector('.form-message');
const contactFormInputs = document.querySelectorAll('.form-message .input');


const rules = {
    user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/ // 7 a 14 numeros.
}

const fields = {
	name: false,
	email: false,
	message: false
}


const contactFormValidate = (e) =>{
    const event = e.target;

    switch(event.name){
        case 'name':
            if (!rules.name.test(event.value) || event.value.length == 0){
                document.querySelector('.form-group-name').classList.add('form-group-error');
                fields.name = false;
            }else{
                document.querySelector('.form-group-name').classList.remove('form-group-error');
                fields.name = true;
            }
        
            break;
        
        case 'email':
            if (!rules.email.test(event.value) || event.value.length == 0){
                document.querySelector('.form-group-email').classList.add('form-group-error');
                fields.email = false;
            }else{
                document.querySelector('.form-group-email').classList.remove('form-group-error');
                fields.email = true;
            }
            break;

        case 'message':
            if (event.value.length == 0){
                document.querySelector('.form-group-message').classList.add('form-group-error');
                fields.message = false;
            }else{
                document.querySelector('.form-group-message').classList.remove('form-group-error');
                fields.message = true;
            }
            
            break;

    }
}


contactFormInputs.forEach(input => {
    input.addEventListener('keyup',contactFormValidate);
    input.addEventListener('keyup',contactFormValidate);
})

contactForm.addEventListener('submit', (e)=>{
    const messageSubmit = document.querySelector('.form-submit-message');
    
    if (!fields.name && !fields.email && !fields.message){
        e.preventDefault();
        messageSubmit.innerHTML = "El mensaje NO fue enviado"
    }
})


