let Excel = require('exceljs');
let workbook = new Excel.Workbook();

let filePath = process.argv[2];

let worksheetName = process.argv[3];

let rawAPNCol = process.argv[4]; // index of the column with raw apns

let targetColIndex = process.argv[5];  // save the index of the column we will write to

let delimiter = process.argv[6];

workbook.xlsx.readFile(filePath)
    .then(function() {

        let worksheet = workbook.getWorksheet(worksheetName);
        // console.log(worksheet);
        // console.log(filePath + rawAPNCol + targetColIndex);
        let apns = worksheet.getColumn(rawAPNCol).values.slice(0);  // save the apns in a a copy of the actual array

        apns.shift(); // remove the extra values in the beginning of the apn array
        // apns.shift();

        // console.log(apns);

        for (let i = 0; i < apns.length; i++) {  // edit each string within the apn array

          let regex1 = new RegExp("[0-9]*[a-zA-Z]{1}[0-9]*[a-zA-Z]{1}[0-9]*");

            if (regex1.test(apns[i])) {
                console.log("regex terminate: " + apns[i]);
                continue;
            }

            let apn = apns[i].split(delimiter);


            let book = apn[0].replace(/\s/g, ''); // remove all spaces
            let page = apn[1].replace(/\s/g, '');
            let parcel = apn[2].replace(/\s/g, '');
            let subPN = apn[3];


            if (book.length === 3 || book.length == 2) {
              book = book + " ";
            } 

            if (subPN == undefined) {
              subPN = "00";
            } else {
              subPN.replace(/\s/g, '');
            }

            // concatenate all 4 strings
            apns[i] = book + page +  parcel + subPN.replace(/\s/g, '');

            // console.log(apns[i]);
        }

        // console.log(apns);

        if (worksheet.getColumn(targetColIndex).values.length !== 0) {  // before we write the data, make sure the column is empty
               console.log("Error: Target column must be empty, try again with a different index.");
               console.log(usage());
               return; // don't write anything and get out of the script
        }

        // apns.unshift();

        worksheet.getColumn(targetColIndex).values = apns; // assign the modified apns to the target column's array

        return workbook.xlsx.writeFile(filePath);  // write to the file
    });


let usage = () => {
    return "Usage: excelparse.js <path to file> <name of worksheet> <index of raw apn column> <index of target column> <delimiter>"
}
