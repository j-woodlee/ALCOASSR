let Excel = require('exceljs');
let workbook = new Excel.Workbook();

let filePath = process.argv[2];

let worksheetName = process.argv[3];

let rawInputColumn = process.argv[4];

let targetColumn = process.argv[5];  // save the index of the column we will write to


workbook.xlsx.readFile(filePath)
    .then(function() {
        let worksheet = workbook.getWorksheet(worksheetName);
        let rawValues = worksheet.getColumn(rawInputColumn).values.slice(0);  // save the apns in a a copy of the actual array

        rawValues.shift(); // remove the extra values in the beginning of the apn array
        rawValues.shift();


        for (let i = 0; i < rawValues.length; i++) {  // edit each string within the array of values
            // rawValues[i] is the string that we want to remove all spaces from

            let rawSubStrings = rawValues[i].split(" ");

            let finalString = rawSubStrings[0].replace(/\s/g, '');  // append the first cleaned up substring before the loop starts to prevent an extra space
            for (let j = 1; j < rawSubStrings.length; j++) {
              rawSubStrings[j] = rawSubStrings[j].replace(/\sg/,''); // remove all spaces from each substring
              finalString += " " + rawSubStrings[j];  // add each substring to the finalString with a space in between each
            }

            rawValues[i] = finalString; // put the original string back with no spaces

        }

        if (worksheet.getColumn(targetColIndex).values.length !== 0) {  // before we write the data, make sure the column is empty
               console.log("Error: Target column must be empty, try again with a different index.");
               console.log(usage());
               return; // don't write anything and get out of the script
        }

        worksheet.getColumn(targetColIndex).values = rawValues; // assign the modified apns to the target column's array

        return workbook.xlsx.writeFile(filePath);  // write to the file
    });


let usage = () => {
    return "Usage: excelparse.js <path to file> <name of worksheet> <index of raw apn column> <index of target column> <delimiter(coming soon)>"
}
