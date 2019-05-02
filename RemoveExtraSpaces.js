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

        worksheet.getColumn(targetColumn).values = rawValues; // assign the modified apns to the target column's array

        return workbook.xlsx.writeFile(filePath);  // write to the file
    });


let usage = () => {
    return "Usage: RemoveExtraSpaces.js <path to file> <name of worksheet> <index of column with extra spaces> <index of target column>"
}
