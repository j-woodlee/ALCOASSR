let Excel = require('exceljs');
let workbook = new Excel.Workbook();

let filePath = process.argv[2];
let targetColIndex = parseInt(process.argv[3], 10);  // save the index of the column we will write to

workbook.xlsx.readFile(filePath)
    .then(function() {
        let worksheet = workbook.getWorksheet(1);
        let apns = worksheet.getColumn(1).values.slice(0);  // save the apns in a a copy of the actual array


        apns.shift(); // remove the extra value in the beginning of the apn array

        console.log(apns);

        for (let i = 0; i < apns.length; i++) {  // edit each string within the apn array
            apns[i] = apns[i].replace(/-/g, '');
        }

        console.log(apns);

        if (worksheet.getColumn(targetColIndex).values.length !== 0) {  // before we write the data, make sure the column is empty
               console.log("Error: Target column must be empty, try again with a different index.");
               console.log(usage());
               return; // don't write anything and get out of the script
        }

        worksheet.getColumn(targetColIndex).values = apns; // assign the modified apns to the target column's array

        return workbook.xlsx.writeFile(filePath);  // write to the file
    });


let usage = () => {
    return "Usage: excelparse.js <path to file> <index of target column> <type of manipulation(coming soon)>"
}

// console.log(process.argv[2]);
// let row = worksheet.getRow(5);

// row.getCell(1).value = 5; // A5's value set to 5
// row.commit();
