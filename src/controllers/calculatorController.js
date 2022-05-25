const loadLang = require('./loadLangController');
const PDFprinter = require('pdfmake');
const fs = require('fs');
const transporter = require('./transporterMail');
const path = require('path');

const moneyFormat = new Intl.NumberFormat('en-US',{
    style:'currency',
    currency:'USD',
})
const fonts = {
  Roboto: {
    normal: Buffer.from(
      require("pdfmake/build/vfs_fonts.js").pdfMake.vfs["Roboto-Regular.ttf"],"base64"
    ),
		bold: Buffer.from(
      require("pdfmake/build/vfs_fonts.js").pdfMake.vfs["Roboto-Regular.ttf"],"base64"
    ),
		italics: Buffer.from(
      require("pdfmake/build/vfs_fonts.js").pdfMake.vfs["Roboto-Regular.ttf"],"base64"
    ),
		bolditalics: Buffer.from(
      require("pdfmake/build/vfs_fonts.js").pdfMake.vfs["Roboto-Regular.ttf"],"base64"
    )
	}
};
const styles = {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10],
      alignment: 'center'
    },
    subHeader: {
      fontSize: 12,
      bold: true,
      margin: [0, 10, 0, 5],
      alignment: 'center',
      color: '#DBB90F'
    },
    preLoanDetails:{
      fontSize: 12,
      bold: true,
      margin: [0, 10, 0, 5],
    },
    preLoanPayments:{
      fontSize: 12,
      bold: true,
      margin: [0, 10, 0, 5],
    },
    tableLoanDetails: {
      margin: [0, 5, 0, 15],
      alignment: 'center',
    },
    tablePayments: {
      alignment: 'center',
      margin: [0, 5, 0, 15],
    },
    tableOpacityExample: {
      fontSize: 12,
      margin: [0, 5, 0, 15],
      fillColor: 'blue',
      fillOpacity: 0.3,
      alignment: 'center'
    },
    tableHeader: {
      bold: true,
      fontSize: 8,
      color: 'black',
      fillColor: '#DBB90F',
      fillOpacity: 0.8,
      alignment: 'center'
    },
    paymentTableHeader:{
      alignment: 'center',
      bold: true,
      fillColor: '#093147',
      fillOpacity: 0.8,
      fontSize: 8,
      color: 'white'
    },
    paymentDate: {
      bold: false,
      fontSize: 10,
      color: 'black',
      alignment: 'center'
    },
    tableFooter: {
      bold: false,
      fontSize: 6,
      color: 'black',
      alignment: 'center'
    }
}

module.exports = {
    getCalculator: (req,res)=>{

        let lang = null;
        if (req.cookies.lang == undefined){
          lang='eng';
        }else{
          lang=req.cookies.lang;
        }
        let language = loadLang(lang);
    
        res.render('calculator',{
          title: "Calculator | Palermo Lender",
          navbarDat:language._navbarDat, 
          langFlag: lang, 
          footerDat: language._footerDat, 
          calculatorDat: language._calculatorDat,
          titlesDat: language._titlesDat});
    },

    processCalculator: async function(req,res){

    let lang = null;

    if (req.cookies.lang == undefined){
        lang='eng';
    }else{
        lang=req.cookies.lang;
    }
    let language = loadLang(lang);

    let _loanAmount = Math.floor(req.body.estimatedValue*(req.body.mortgageAmount/100));
    let _annualPayment = Math.floor(_loanAmount/req.body.mortgageInterest);
    let _monthPayment = Math.floor(_annualPayment/ 12);
    let _loanCostPercent = req.body.estLoanCosts;
    let _estOriginPercent = req.body.estOrigFree;
    let _estimatedValue = Math.floor(req.body.estimatedValue);
    let _mortgageAmount = 100-req.body.mortgageAmount; 
    let _mortgageInterest = req.body.mortgageInterest;
    let _mortgageTenor;
    let _tenorMonthOrWeeks = req.body.mortgageTenor;

    if (_tenorMonthOrWeeks > 36 ){
        _mortgageTenor =  req.body.mortgageTenor/4;
    }else{
        _mortgageTenor =  req.body.mortgageTenor;
    }



    let _payments = [];
    let _paymentsPDF = [];
    let _cumulativePayment = 0;

    for (let i = 0; i < _mortgageTenor; i++) {

        _cumulativePayment+= _monthPayment;
        _id = i+1;
        _payments.push({
        id: _id,
        cumulativePayment: _cumulativePayment
        })

        

        if (i==31){
        _paymentsPDF.push([
            { text: 'Payment', style: 'paymentTableHeader', border: [false,false,false,false]},  
            { text: 'Interest Payment', style: 'paymentTableHeader', border: [false,false,false,false] }, 
            { text: 'Cumulative Payment', style: 'paymentTableHeader', border: [false,false,false,false] }
        ])
        }

        _paymentsPDF.push([
            {text: _id, style: 'paymentDate', border: [false,false,false,false]},
            {text: moneyFormat.format(_monthPayment), style: 'paymentDate', border: [false,false,false,false]},
            {text: moneyFormat.format(_cumulativePayment), style: 'paymentDate', border: [false,false,false,false]}
            ])
    }

    

    /* OUTPUT TO VIEW */
    let output = {
        estimatedValue:  _estimatedValue, //VALOR DE LA CASA COMO VIENE EN INPUT
        mortgageAmount: _mortgageAmount, //PORCENTAJE DE PRESTAMO COMO VIENE
        loanAmount: _loanAmount,
        mortgageInterest: _mortgageInterest, // TAL COMO VIENE 
        mortgageTenor: _mortgageTenor, // TAL COMO VIENE
        annualInterest: _annualPayment,
        monthInterest: _monthPayment,
        loanCostPercent: _loanCostPercent, // TAL COMO VIENE
        estOrigPercent: _estOriginPercent, // TAL COMO VIENE
        estLoanCosts: Math.floor(_loanAmount*(_loanCostPercent/100)), // % DEL LOAN AMOUNT
        estOrigFree: Math.floor(_loanAmount*(_estOriginPercent/100)), // % DEL LOAN AMOUNT 
        totalClosing: Math.floor((_loanAmount*(_loanCostPercent/100)) + (_loanAmount*(_estOriginPercent/100))), // estLoanCost+ estOrignFree
        payments: _payments
    }

    if (req.body.sendEmail.length > 3){
      /* PDF CREATE */
      const content = [
          { text: 'Mortgage Loan Calculator Results', style: 'header' },
          { text: 'Brought to you by Palermo Lender', style: 'subHeader' },
          { text: 'Loan Details', style: 'preLoanDetails' },
          {
          style: 'tableLoanDetails',
          table: 
          {
              headerRows: 1,
              widths: ['*', '*', '*', '*', '*'],
              body: 
              [
              [
                  { text: 'Estimated Property Value', style: 'tableHeader' }, 
                  { text: 'Down Payment', style: 'tableHeader' }, 
                  { text: 'Loan Amount', style: 'tableHeader' }, 
                  { text: 'Interest', style: 'tableHeader' }, 
                  { text: 'Term', style: 'tableHeader' }
              ],
              [
                  { text: moneyFormat.format(output.estimatedValue), style: 'paymentDate' }, 
                  { text: output.mortgageAmount+'%', style: 'paymentDate' }, 
                  { text: moneyFormat.format(output.loanAmount), style: 'paymentDate' }, 
                  { text: output.mortgageInterest+'%', style: 'paymentDate' } , 
                  { text: output.mortgageTenor+' Months', style: 'paymentDate' }
              ],
              ]
          },  
          layout: 'noBorders'
          },
          {
          style: 'tableLoanDetails',
          table: 
          {
              widths: ['*', '*', '*', '*', '*'],
              body: 
              [
              [
                  { text: 'Month Interest Payment', style: 'tableHeader' }, 
                  { text: 'Annual Interest Payment', style: 'tableHeader' }, 
                  { text: 'Est. Loan Costs', style: 'tableHeader' }, 
                  { text: 'Est. Origination Free', style: 'tableHeader' }, 
                  { text: 'Total Closing Costs', style: 'tableHeader' }
              ],
              [
                  { text: moneyFormat.format(output.monthInterest), style: 'paymentDate' },
                  { text: moneyFormat.format(output.annualInterest), style: 'paymentDate' } ,
                  { text: moneyFormat.format(output.estLoanCosts), style: 'paymentDate' } , 
                  { text: moneyFormat.format(output.estOrigFree), style: 'paymentDate' }, 
                  { text: moneyFormat.format(output.totalClosing), style: 'paymentDate' } 
              ]
              ]
          },  
          layout: 'noBorders'
          },
          { text: 'Amortization Schedule (P & I)', style: 'preLoanDetails' },
          {
          style: 'tableLoanDetails',
          table: 
          {
              widths: ['*', '*', '*'],
              body: 
              [
              [
                  { text: 'Payment', style: 'paymentTableHeader', border: [false,false,false,false]},  
                  { text: 'Interest Payment', style: 'paymentTableHeader', border: [false,false,false,false] }, 
                  { text: 'Cumulative Payment', style: 'paymentTableHeader', border: [false,false,false,false] }
              ],
              ..._paymentsPDF
              ]
          },  
          layout: {
              fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#e0e0e0' : null;
              }
          }
          },
          { text: 'Calculations by this calculator are estimates only. There is no warranty for the accuracy of the results or the relationship to your financial situation.', style: 'tableFooter' },
      ]
  
      
      try {
          let docDefinition = {
          content: content,
          styles: styles
          }
          
          const printer = new PDFprinter(fonts);
  
          let pdfDoc = printer.createPdfKitDocument(docDefinition);
          
          const filename = `Calculator Result - By Palermo Lender - ${Date.now()}.pdf`;
          const file = fs.createWriteStream(filename)
          pdfDoc.pipe(file);
          pdfDoc.end();
          const pathF = path.resolve(filename)
  
  
          
          // send mail with defined transport object
          await transporter.sendMail({
            from: 'Palermo Lender <mails@palermolender.com>', // sender address
            to: req.body.sendEmail, // list of receivers
            subject: "Palermo Lender - Calculator Results", // Subject line
            attachments: [
              {
                filename: filename,
                path: pathF
              }
            ]
          });    
  
          fs.rmSync(filename);
  
          
          
      } catch (error) {
          console.log(error);
      }
    }

    
    res.render('calculator', {
        title:"Calculator Results | Palermo Lender",
        output: output, 
        payments: _payments,
        navbarDat:language._navbarDat, 
        langFlag: lang, 
        footerDat: language._footerDat, 
        calculatorDat: language._calculatorDat
    })
  },
}