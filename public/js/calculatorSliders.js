const cleave = new Cleave('#value1-hidden-input',{
    numeral: true,
    prefix: '$',
    onValueChanged: function(e){
        rawMoney = e.target.rawValue.replace( /^\D+/g, '');
        if (rawMoney == ''){
            document.getElementById("value1").value = 0;
            document.getElementById("range1").value = 0;
        }else{
            document.getElementById("value1").value = rawMoney;
            document.getElementById("range1").value = rawMoney;
        }
    }
})

/* Format number */
const moneyFormat = new Intl.NumberFormat('en-US',{
    style:'currency',
    currency:'USD',
})


/* Estimated Property Value */
const slider1 = document.getElementById("range1"); // input range
const output1 = document.getElementById("value1"); // span
const hiddenInput = document.getElementById("value1-hidden-input"); // input text

output1.innerHTML = moneyFormat.format(slider1.value);
hiddenInput.style.display = "none"; 

output1.addEventListener('click',()=>{
    output1.style.display="none";
    hiddenInput.style.display="block";
    hiddenInput.value = output1.innerHTML;
})
 
hiddenInput.addEventListener('blur',()=>{
    hiddenInput.style.display="none";
    output1.style.display="block";
    output1.innerHTML = hiddenInput.value; 
     if (parseInt(output1).value>10000000){
        output1.innerHTML = moneyFormat.format(10000000);
        slider1.value = 10000000;
    }else{
        output1.innerHTML = hiddenInput.value;
    } 
})


slider1.oninput = function(){
    output1.innerHTML = moneyFormat.format(this.value);
}



/* Mortgage Amount */
const slider2 = document.getElementById("range2");
const output2 = document.getElementById("value2");

output2.innerHTML = slider2.value;

slider2.oninput = function(){
    output2.innerHTML = this.value;
}

/* Tenor */
const slider3 = document.getElementById("range3");
const output3 = document.getElementById("value3");

output3.innerHTML = slider3.value;

slider3.oninput = function(){
    output3.innerHTML = this.value;
}

/* Interest Rate (%)  */
const slider4 = document.getElementById("range4");
const output4 = document.getElementById("value4");

output4.innerHTML = slider4.value;

slider4.oninput = function(){
    output4.innerHTML =this.value;
}

/* Est. Origination Fee  */
const slider5 = document.getElementById("range5");
const output5 = document.getElementById("value5");

output5.innerHTML = slider5.value;

slider5.oninput = function(){
    output5.innerHTML = this.value;
}

/* Est. Loan Costs */
const slider6 = document.getElementById("range6");
const output6 = document.getElementById("value6");

output6.innerHTML = slider6.value;

slider6.oninput = function(){
    output6.innerHTML = this.value;
}



/*****************  OUTPUTS CALCULATOR  ******************/

/* Estimated value property */
let calculatorOut1 = document.getElementById('calculator-output-value-1');
if (calculatorOut1){
    calculatorOut1.innerHTML = moneyFormat.format(calculatorOut1.innerHTML);
}
/* Loan amount */
let calculatorOut3 = document.getElementById('calculator-output-value-3');
if (calculatorOut3){
    calculatorOut3.innerHTML = moneyFormat.format(calculatorOut3.innerHTML);
}
/* Month interest */
let calculatorOut6 = document.getElementById('calculator-output-value-6');
if (calculatorOut6){
    calculatorOut6.innerHTML = moneyFormat.format(calculatorOut6.innerHTML);
}
/* Annual interest */
let calculatorOut7 = document.getElementById('calculator-output-value-7');
if (calculatorOut7){
    calculatorOut7.innerHTML = moneyFormat.format(calculatorOut7.innerHTML);
}
/* Est. Loan costs */
let calculatorOut8 = document.getElementById('calculator-output-value-8');
if (calculatorOut8){
    calculatorOut8.innerHTML = moneyFormat.format(calculatorOut8.innerHTML);
}
/* Est. orig free */
let calculatorOut9 = document.getElementById('calculator-output-value-9');
if (calculatorOut9){
    calculatorOut9.innerHTML = moneyFormat.format(calculatorOut9.innerHTML);
}
/* Total Closing cost */
let calculatorOut10 = document.getElementById('calculator-output-value-10');
if (calculatorOut10){
    calculatorOut10.innerHTML = moneyFormat.format(calculatorOut10.innerHTML);
}


/* Interest payment */
let calculatorOut11 = document.querySelectorAll('.calculator-output-value-11');
if (calculatorOut11){
    calculatorOut11.forEach(IPayment=>{
        IPayment.innerHTML = moneyFormat.format(IPayment.innerHTML);
        
    })
}

/* Cumulative payment */
let calculatorOut12 = document.querySelectorAll('.calculator-output-value-12');
if (calculatorOut12){
    calculatorOut12.forEach(CPayment=>{
        CPayment.innerHTML = moneyFormat.format(CPayment.innerHTML);
    })
}




/* MONTHS OR WEEKS */

let itemTenorMonth = document.querySelector('#item-tenor-months');
let itemTenorMonthLabel = document.querySelector('.item-tenor-months-label');  
let itemTenorWeeks = document.querySelector('#item-tenor-weeks');
let itemTenorWeeksLabel = document.querySelector('.item-tenor-weeks-label');
let langHiddenValue = document.querySelector('.lang-hidden-value'); 
let itemTenorTitle = document.querySelector('.item-tenor-field-title'); 

itemTenorWeeksLabel.addEventListener('click',()=>{
    if (!itemTenorWeeks.checked){
        slider3.setAttribute('max',slider3.max*4);
        slider3.value = slider3.value*4;
        value3.innerHTML = slider3.value;
        
        if (langHiddenValue.innerHTML == 'esp'){
            itemTenorTitle.innerHTML = ' Semanas';
        }else{
            itemTenorTitle.innerHTML = ' Weeks';
        }

        
    }
})

itemTenorMonthLabel.addEventListener('click',()=>{
    if (!itemTenorMonth.checked){
        slider3.setAttribute('max',slider3.max/4);
        slider3.value = slider3.value/4;
        value3.innerHTML = Math.round(slider3.value);
    }

    if (langHiddenValue.innerHTML == 'esp'){
        itemTenorTitle.innerHTML = ' Meses';
    }else{
        itemTenorTitle.innerHTML = ' Months';
    }
})

const calculatorForm = document.querySelector('.calculator-form-container');
const rule = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}
const calculatorFormInput = document.querySelector('.calculator-form-container #sendEmailId');
let email = false;


const contactFormValidate = (e) =>{
    const event = e.target;

    switch(event.name){
        
        case 'sendEmail':
            if (!rules.email.test(event.value) || event.value.length == 0){
                email = false;
            }else{
                email = true;
            }
            break;
    }
}


calculatorFormInput.addEventListener('keyup',contactFormValidate);

calculatorForm.addEventListener('submit', (e)=>{
    
    if (email){
        alert('el email no pasa')
        e.preventDefault();
    }
})

