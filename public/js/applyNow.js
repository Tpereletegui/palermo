/************** RANGE STYLES  **************/


/* Format number */
const moneyFormat = new Intl.NumberFormat('en-US',{
    style:'currency',
    currency:'USD',
})


/* Purchase Price / Estimated As-Is Value */
new Cleave('#an-hidden-input1',{
    numeral: true,
    prefix: '$',
    onValueChanged: function(e){
        rawMoney = e.target.rawValue.replace( /^\D+/g, '');
        if (rawMoney == ''){
            document.getElementById("an-value1").value = 0;
            document.getElementById("an-range1").value = 0;
        }else{
            document.getElementById("an-value1").value = rawMoney;
            document.getElementById("an-range1").value = rawMoney;
        }
    }
})


/* Estimated Property Value */
const sliderDI1 = document.getElementById("an-range1"); // input range
const outputDI1 = document.getElementById("an-value1"); // span
const hiddenInputDI = document.getElementById("an-hidden-input1"); // input text

outputDI1.innerHTML = moneyFormat.format(sliderDI1.value);
hiddenInputDI.style.display = "none"; 

outputDI1.addEventListener('click',()=>{
    outputDI1.style.display="none";
    hiddenInputDI.style.display="block";
    hiddenInputDI.value = outputDI1.innerHTML;
})
 
hiddenInputDI.addEventListener('blur',()=>{
    hiddenInputDI.style.display="none";
    outputDI1.style.display="block";
    outputDI1.innerHTML = hiddenInputDI.value; 
     if (parseInt(outputDI1).value>10000000){
        outputDI1.innerHTML = moneyFormat.format(10000000);
        sliderDI1.value = 10000000;
    }else{
        outputDI1.innerHTML = hiddenInputDI.value;
    } 
})


sliderDI1.oninput = function(){
    outputDI1.innerHTML = moneyFormat.format(this.value);
}



/* After repair value */
new Cleave('#an-hidden-input2',{
    numeral: true,
    prefix: '$',
    onValueChanged: function(e){
        rawMoney = e.target.rawValue.replace( /^\D+/g, '');
        if (rawMoney == ''){
            document.getElementById("an-value2").value = 0;
            document.getElementById("an-range2").value = 0;
        }else{
            document.getElementById("an-value2").value = rawMoney;
            document.getElementById("an-range2").value = rawMoney;
        }
    }
})

const sliderDI2 = document.getElementById("an-range2"); // input range
const outputDI2 = document.getElementById("an-value2"); // span
const hiddenInputDI2 = document.getElementById("an-hidden-input2"); // input text

outputDI2.innerHTML = moneyFormat.format(sliderDI2.value);
hiddenInputDI2.style.display = "none"; 

outputDI2.addEventListener('click',()=>{
    outputDI2.style.display="none";
    hiddenInputDI2.style.display="block";
    hiddenInputDI2.value = outputDI2.innerHTML;
})
 
hiddenInputDI2.addEventListener('blur',()=>{
    hiddenInputDI2.style.display="none";
    outputDI2.style.display="block";
    outputDI2.innerHTML = hiddenInputDI2.value; 
     if (parseInt(outputDI2).value>10000000){
        outputDI2.innerHTML = moneyFormat.format(10000000);
        sliderDI2.value = 10000000;
    }else{
        outputDI2.innerHTML = hiddenInputDI2.value;
    } 
})


sliderDI2.oninput = function(){
    outputDI2.innerHTML = moneyFormat.format(this.value);
}




/* Target Closing Timing: */
var sliderDI3 = document.getElementById("an-range3");
var outputDI3 = document.getElementById("an-value3");

if (outputDI3){
    outputDI3.innerHTML = sliderDI3.value;
}

if (sliderDI3){
    sliderDI3.oninput = function(){
        outputDI3.innerHTML = this.value;
    }
}

/* Loan tenor */
var sliderDI4 = document.getElementById("an-range4");
var outputDI4 = document.getElementById("an-value4");

if (outputDI4){
    outputDI4.innerHTML = sliderDI4.value;
}

if (sliderDI4){
    sliderDI4.oninput = function(){
        outputDI4.innerHTML = this.value;
    }
}

let propResidential = document.getElementById('property-residential');
let propResLabel = document.getElementById('property-residential-label')


let notAbleOnly = () => {
    propResLabel.addEventListener('click', () =>{
    if (propResidential.checked==false){
        propResLabel.setAttribute("data-toggle", "modal");
        propResLabel.setAttribute("data-target", "#modalQ")
    }else{
        propResLabel.removeAttribute("data-toggle", "modal");
        propResLabel.removeAttribute("data-target", "#modalQ")
    }
    })
}

let unselect = ()=>{
    propResidential.checked =false;
}

/* DISABLE BROKER WORKING */
let inputNoBroker = document.getElementById('nobrokerwork');
let inputYesBroker = document.getElementById('yesbrokerwork');
let inputsBrokerContain = document.querySelector('.broker-contact-info');

inputNoBroker.addEventListener('change',()=>{
    if (inputNoBroker.checked == true){
    inputsBrokerContain.style.display="none";
    }
})

inputYesBroker.addEventListener('change', ()=>{
    if (inputYesBroker.checked== true){
    inputsBrokerContain.style.display="block";
    }
})

let rehabLoanInput = document.querySelector('#rehab-loan');
let firstNextButton = document.querySelector('.first-next-button');
let afterRepairSlider = document.querySelector('.if-rehab-loan');

firstNextButton.addEventListener('click',()=>{
    if (rehabLoanInput.checked == false){
        afterRepairSlider.style.display = "none";
    }else{
        afterRepairSlider.style.display = "block";
    }
})


/* STEP 5 ~ OTHER*/
let otherHiddenInput = document.querySelector('#other-ad');
let otherLabel = document.querySelector('.other-how-label');
let otherTitle = document.querySelector('.other-how-title');
let otherInput = document.querySelector('.other-how-input');

otherInput.style.display="none";

otherLabel.addEventListener('click',()=>{

    otherTitle.style.display="none";
    otherInput.style.display="block";
    
})

otherHiddenInput.addEventListener('change',()=>{
    if (otherHiddenInput.checked==true){
        otherTitle.style.display="block";
        otherInput.style.display="none";
    }
})

//broker-phone-input
new Cleave('#broker-phone-input', {
    phone: true,
    phoneRegionCode: 'US'
});

new Cleave('#borrower-phone-input', {
    phone: true,
    phoneRegionCode: 'US'
});