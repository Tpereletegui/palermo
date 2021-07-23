const cleave = new Cleave('#value1-hidden-input',{
    numeral: true,
    prefix: '$',
    onValueChanged: function(e){
        rawMoney = e.target.rawValue.replace( /^\D+/g, '');
        if (rawMoney == ''){
            document.getElementById("range1").value = 0;
        }else{
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
var slider1 = document.getElementById("range1"); // input range
var output1 = document.getElementById("value1"); // span
var hiddenInput = document.getElementById("value1-hidden-input"); // input text

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
var slider2 = document.getElementById("range2");
var output2 = document.getElementById("value2");

output2.innerHTML = slider2.value;

slider2.oninput = function(){
    output2.innerHTML = this.value;
}

/* Tenor */
var slider3 = document.getElementById("range3");
var output3 = document.getElementById("value3");

output3.innerHTML = slider3.value;

slider3.oninput = function(){
    output3.innerHTML = this.value;
}

/* Interest Rate (%)  */
var slider4 = document.getElementById("range4");
var output4 = document.getElementById("value4");

output4.innerHTML = slider4.value;

slider4.oninput = function(){
    output4.innerHTML =this.value;
}

/* Est. Origination Fee  */
var slider5 = document.getElementById("range5");
var output5 = document.getElementById("value5");

output5.innerHTML = slider5.value;

slider5.oninput = function(){
    output5.innerHTML = this.value;
}

/* Est. Loan Costs */
var slider6 = document.getElementById("range6");
var output6 = document.getElementById("value6");

output6.innerHTML = slider6.value;

slider6.oninput = function(){
    output6.innerHTML = this.value;
}



/*****************  OUTPUTS CALCULATOR  ******************/

/* Estimated value property */
let calculatorOut1 = document.getElementById('calculator-output-value-1');
calculatorOut1.innerHTML = moneyFormat.format(calculatorOut1.innerHTML);
/* Loan amount */
let calculatorOut3 = document.getElementById('calculator-output-value-3');
calculatorOut3.innerHTML = moneyFormat.format(calculatorOut3.innerHTML);
/* Month interest */
let calculatorOut6 = document.getElementById('calculator-output-value-6');
calculatorOut6.innerHTML = moneyFormat.format(calculatorOut6.innerHTML);
/* Annual interest */
let calculatorOut7 = document.getElementById('calculator-output-value-7');
calculatorOut7.innerHTML = moneyFormat.format(calculatorOut7.innerHTML);
/* Est. Loan costs */
let calculatorOut8 = document.getElementById('calculator-output-value-8');
calculatorOut8.innerHTML = moneyFormat.format(calculatorOut8.innerHTML);
/* Est. orig free */
let calculatorOut9 = document.getElementById('calculator-output-value-9');
calculatorOut9.innerHTML = moneyFormat.format(calculatorOut9.innerHTML);
/* Total Closing cost */
let calculatorOut10 = document.getElementById('calculator-output-value-10');
calculatorOut10.innerHTML = moneyFormat.format(calculatorOut10.innerHTML);

/* Interest payment */
let calculatorOut11 = document.querySelectorAll('.calculator-output-value-11');
calculatorOut11.forEach(IPayment=>{
    IPayment.innerHTML = moneyFormat.format(IPayment.innerHTML);
})

/* Cumulative payment */
let calculatorOut12 = document.querySelectorAll('.calculator-output-value-12');
calculatorOut12.forEach(CPayment=>{
    CPayment.innerHTML = moneyFormat.format(CPayment.innerHTML);
})
