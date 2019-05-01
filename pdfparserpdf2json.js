let fs = require('fs');
let PDFParser = require("pdf2json");

    let pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
      let json = pdfParser.getAllFieldsTypes();  //  array of objects

      for (let i = 0; i < json.length; i++) { // sloppy but w/e
          if (json[i].id === "EMPLOYEE_NAME") {
              console.log(json[i].value);
          }

          if (json[i].id === "EMPLOYEE_ID") {
              console.log(json[i].value);
          }

          if (json[i].id === "DATES_OF_LEAVE") {
              console.log(json[i].value);
          }

          if (json[i].id === "DATE_OF_REQUEST") {
              console.log(json[i].value);
          }

          if (json[i].id === "SUPERVISORS_NAME") {
              console.log(json[i].value);
          }
      }


      // console.log(JSON.stringify(json));
        // fs.writeFile("./test.json", JSON.stringify(pdfParser.getAllFieldsTypes()), () => {});
    });

    pdfParser.loadPDF("./Partial-SLA-Example.pdf");
