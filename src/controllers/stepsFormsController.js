const loadLang = require('./loadLangController');
const transporter = require('./transporterMail');
/* Format number */
const moneyFormat = new Intl.NumberFormat('en-US',{
  style:'currency',
  currency:'USD',
})

module.exports = {    
    applyNow: function(req,res){
    
      let lang = null;
      
      
      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }
      let language = loadLang(lang);
      

      res.render('multiple-step-form',{
        windowTitle: "Apply Now | Palermo Lender",
        navbarDat:language._navbarDat, 
        langFlag: lang, 
        footerDat: language._footerDat, 
        mode: 'apply' , 
        title: (language._applyNowDat).title,  
        applyNowDat: language._applyNowDat
      });
    },
    processApplyNow: async function(req,res){

      let loanType;
      /* STEP 1 AND 2  */
      if (loanType === "Other Loan"){
        loanType = req.body.otherLoanType;
      }else{
        loanType = req.body.loanType;
      }

      let propertyType;
      if (propertyType === "Other"){
        propertyType = req.body.otherProperty;
      }else{
        propertyType = req.body.propertyType;
      }


      /* STEP 3 */
      let DIaddress = req.body.address;
      let DIcity = req.body.city;
      let DIstate = req.body.state;
      let DIzip = req.body.zip;


      let DIestValue = req.body.anEstimatedValue;
      let DIaftRepairValue = req.body.anAfterRepairValue;
      let DImortTenor;
      if (req.body.anMortgageTenor){
        DImortTenor = req.body.anMortgageTenor;
      }

      let DIclosingTime;
      if (req.body.anClosingTime){
        DIclosingTime = req.body.anClosingTime;
      }

      let BRfirstName, BRlastName, BRemail, BRphone;

      /* STEP 4 */
      if (req.body.brokerwork == 'yes'){
        BRfirstName = req.body.brokerFirstName;
        BRlastName = req.body.brokerLastName;
        BRemail = req.body.brokerEmail;
        BRphone = req.body.brokerPhone;
      }

      let BRWfirstName, BRWlastName, BRWemail, BRWphone, BRWaddress, BRWcity, BRWstate, BRWzip, estFico;

      BRWfirstName = req.body.borrowerFirstName;
      BRWlastName = req.body.borrowerLastName;
      BRWemail = req.body.borrowerEmail;
      BRWphone = req.body.borrowerPhone;
      BRWaddress = req.body.borrowerAddress;
      BRWcity = req.body.borrowerCity;
      BRWstate = req.body.borrowerState;
      BRWzip= req.body.borrowerZIP;
      estFico = req.body.estimatedFico;

      /* STEP 5 */

      let howHear;

      if (req.body.howyouhear == 'Other'){
        howHear = req.body.otherContact;
      }else{
        howHear = req.body.howyouhear;
      }

      
      await transporter.sendMail({
        from: 'Palermo Lender <mails@palermolender.com>', // sender address
        to: "maxincolla@gmail.com", // list of receivers
        subject: "New Apply Now ", // Subject line
        html: `<div>
                <p style="font-weight: 700; color: #093147;">Loan and Property Type</p>
                    <p style="margin-left: 20px;">Loan Type: `+loanType+`</p>
                    <p style="margin-left: 20px;">Property Type: `+propertyType+`</p>
                
                <p style="font-weight: 700; color: #093147;">Property / Deal Information</p>
                  <p style="color: #DBB90F; margin-left: 10px;">Subject Property Address</p>
                    <p style="margin-left: 20px;">Address: `+DIaddress+`</p>
                    <p style="margin-left: 20px;">City: `+DIcity+`</p>
                    <p style="margin-left: 20px;">State: `+DIstate+`</p> 
                    <p style="margin-left: 20px;">ZIP Code: `+DIzip+`</p> 
                    <p style="margin-left: 20px;">Purchase Price / Estimated As-Is Value: `+ moneyFormat.format(DIestValue)+`</p>
                    <p style="margin-left: 20px;">After Repair Value: `+moneyFormat.format(DIaftRepairValue)+`</p> 
                    <p style="margin-left: 20px;">Loan Tenor: `+DImortTenor+`</p>
                    <p style="margin-left: 20px;">Target Closing Timing: `+DIclosingTime+`</p>
                
                <p style="font-weight: 700; color: #093147;">Borrower Details</p>
                  <p style="color: #DBB90F; margin-left: 10px;">Broker Working on Behalf of a Client?</p>
                    <p style="margin-left: 20px;">First Name: `+BRfirstName+`</p>
                    <p style="margin-left: 20px;">Last Name: `+BRlastName+`</p>
                    <p style="margin-left: 20px;">Email: `+BRemail+`</p>
                    <p style="margin-left: 20px;">Phone: `+BRphone+`</p>
                  <p style="color: #DBB90F; margin-left: 10px;">Principal Borrower Contact Info</p>
                    <p style="margin-left: 20px;">First Name: `+BRWfirstName+`</p>
                    <p style="margin-left: 20px;">Last Name: `+BRWlastName+`</p> 
                    <p style="margin-left: 20px;">Email: `+BRWemail+`</p> 
                    <p style="margin-left: 20px;">Cell Phone: `+BRWphone+`</p> 
                    <p style="margin-left: 20px;">Address: `+BRWaddress+`</p> 
                    <p style="margin-left: 20px;">City: `+BRWcity+`</p> 
                    <p style="margin-left: 20px;">State: `+BRWstate+`</p> 
                    <p style="margin-left: 20px;">ZIP Code: `+BRWzip+`</p> 
                    <p style="margin-left: 20px;">Principal Borrower Estimated FICO Score: `+estFico+`</p> 
                    <p style="margin-left: 20px;">How contact with us?: `+howHear+`</p>
              </div>`
      });    
      res.redirect('/apply-now');
    

      
    },
    prequalify: function(req,res){
    
      let lang = null;
      
      
      if (req.cookies.lang == undefined){
        lang='eng';
      }else{
        lang=req.cookies.lang;
      }
      let language = loadLang(lang);


      res.render('multiple-step-form',{
        windowTitle: "Prequalify | Palermo Lender",
        navbarDat:language._navbarDat, 
        langFlag: lang, 
        footerDat: language._footerDat, 
        mode: 'pre',
        title: (language._applyNowDat).titlePreq,
        applyNowDat: language._applyNowDat
      });
    },
    processPrequalify: async function(req,res){
      let loanType;
      /* STEP 1 AND 2  */
      if (loanType === "Other Loan"){
        loanType = req.body.otherLoanType;
      }else{
        loanType = req.body.loanType;
      }

      let propertyType;
      if (propertyType === "Other"){
        propertyType = req.body.otherProperty;
      }else{
        propertyType = req.body.propertyType;
      }


      /* STEP 3 */
      let DIaddress = req.body.address;
      let DIcity = req.body.city;
      let DIstate = req.body.state;
      let DIzip = req.body.zip;


      let DIestValue = req.body.anEstimatedValue;
      let DIaftRepairValue = req.body.anAfterRepairValue;
      

      let BRfirstName, BRlastName, BRemail, BRphone;

      /* STEP 4 */
      if (req.body.brokerwork == 'yes'){
        BRfirstName = req.body.brokerFirstName;
        BRlastName = req.body.brokerLastName;
        BRemail = req.body.brokerEmail;
        BRphone = req.body.brokerPhone;
      }

      let BRWfirstName, BRWlastName, BRWemail, BRWphone, BRWaddress, BRWcity, BRWstate, BRWzip, estFico;

      BRWfirstName = req.body.borrowerFirstName;
      BRWlastName = req.body.borrowerLastName;
      BRWemail = req.body.borrowerEmail;
      BRWphone = req.body.borrowerPhone;
      BRWaddress = req.body.borrowerAddress;
      BRWcity = req.body.borrowerCity;
      BRWstate = req.body.borrowerState;
      BRWzip= req.body.borrowerZIP;
      estFico = req.body.estimatedFico;

      /* STEP 5 */

      let howHear;

      if (req.body.howyouhear == 'Other'){
        howHear = req.body.otherContact;
      }else{
        howHear = req.body.howyouhear;
      }

      
      await transporter.sendMail({
        from: 'Palermo Lender <mails@palermolender.com>', // sender address
        to: "maxincolla@gmail.com", // list of receivers
        subject: "New Apply Now ", // Subject line
        html: `<div>
                <p style="font-weight: 700; color: #093147;">Loan and Property Type</p>
                    <p style="margin-left: 20px;">Loan Type: `+loanType+`</p>
                    <p style="margin-left: 20px;">Property Type: `+propertyType+`</p>
                
                <p style="font-weight: 700; color: #093147;">Property / Deal Information</p>
                  <p style="color: #DBB90F; margin-left: 10px;">Subject Property Address</p>
                    <p style="margin-left: 20px;">Address: `+DIaddress+`</p>
                    <p style="margin-left: 20px;">City: `+DIcity+`</p>
                    <p style="margin-left: 20px;">State: `+DIstate+`</p> 
                    <p style="margin-left: 20px;">ZIP Code: `+DIzip+`</p> 
                    <p style="margin-left: 20px;">Purchase Price / Estimated As-Is Value: `+moneyFormat.format(DIestValue)+`</p>
                    <p style="margin-left: 20px;">After Repair Value: `+moneyFormat.format(DIaftRepairValue)+`</p> 
                
                <p style="font-weight: 700; color: #093147;">Borrower Details</p>
                  <p style="color: #DBB90F; margin-left: 10px;">Broker Working on Behalf of a Client?</p>
                    <p style="margin-left: 20px;">First Name: `+BRfirstName+`</p>
                    <p style="margin-left: 20px;">Last Name: `+BRlastName+`</p>
                    <p style="margin-left: 20px;">Email: `+BRemail+`</p>
                    <p style="margin-left: 20px;">Phone: `+BRphone+`</p>
                  <p style="color: #DBB90F; margin-left: 10px;">Principal Borrower Contact Info</p>
                    <p style="margin-left: 20px;">First Name: `+BRWfirstName+`</p>
                    <p style="margin-left: 20px;">Last Name: `+BRWlastName+`</p> 
                    <p style="margin-left: 20px;">Email: `+BRWemail+`</p> 
                    <p style="margin-left: 20px;">Cell Phone: `+BRWphone+`</p> 
                    <p style="margin-left: 20px;">Address: `+BRWaddress+`</p> 
                    <p style="margin-left: 20px;">City: `+BRWcity+`</p> 
                    <p style="margin-left: 20px;">State: `+BRWstate+`</p> 
                    <p style="margin-left: 20px;">ZIP Code: `+BRWzip+`</p> 
                    <p style="margin-left: 20px;">Principal Borrower Estimated FICO Score: `+estFico+`</p> 
                    <p style="margin-left: 20px;">How contact with us?: `+howHear+`</p>
              </div>`
      });    
      res.redirect('/prequalify');
    
    },
}    