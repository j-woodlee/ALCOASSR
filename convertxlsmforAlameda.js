let Excel = require('exceljs');
let workbook = new Excel.Workbook();

let readPath = process.argv[2];

let worksheetName = process.argv[3];

let delimiter = '-';

let writePath = "P:\Permits List\\Upload Files\\Testing\\Alameda\\2018\\test1.xlsx";


let apns = [], permitNums = [], issuedDates = [], permitTypes = [], valuations= [], owners= [], permitDistros = [];

workbook.xlsx.readFile(readPath)
    .then(() => {

        let worksheet = workbook.getWorksheet(worksheetName);

        let regex1 = new RegExp("[0-9]*[a-zA-Z]{1}[0-9]*[a-zA-Z]{1}[0-9]*");
        let apn, permitNum, issuedDate, permitType, valuation, owner, permitDistro;
        worksheet.eachRow((row, rowNumber) => {
             if (row.getCell('D').value !== null) {
                  apn = row.getCell('A').value;
                  permitNum = row.getCell('H').value;
                  issuedDate = row.getCell('I').value;
                  permitType = row.getCell('D').value;
                  valuation = row.getCell('E').value;
                  owner = row.getCell('L').value;
                  permitDistro = row.getCell('F').value;

                  // apn logic
                  if (!regex1.test(apn)) {
                     // console.log("regex does not terminate: " + apn);
                     let apnArray = apn.split(delimiter);

                     let book = apnArray[0].replace(/\s/g, ''); // remove all spaces
                     let page = apnArray[1].replace(/\s/g, '');
                     let parcel = apnArray[2].replace(/\s/g, '');
                     let subPN = apnArray[3];

                     if (book.length === 3 || book.length == 2) {
                               book = book + " ";
                     }

                     if (subPN == undefined) {
                               subPN = "00";
                     }
                     // concatenate all 4 strings
                     apn = book + page +  parcel + subPN.replace(/\s/g, '');


                  }
                  // console.log(apn);
                  apns.push(apn);
                  permitNums.push(permitNum);
                  issuedDates.push(issuedDate);
                  permitTypes.push(permitType);
                  valuations.push(valuation);
                  owners.push(owner);
                  permitDistros.push(permitDistro);
              }
              // console.log(apn + ", " + permitNum + ", " + issuedDate + ", " + permitType + ", " +
              // valuation + ", " + owner + ", " + permitDistro);
            });

            let writeBook = new Excel.Workbook();
            writeBook.creator = 'Jake Woodlee';
            writeBook.lastModifiedBy = 'Jake Woodlee';
            writeBook.created = new Date();
            writeBook.modified = new Date();
            writeBook.lastPrinted = new Date();
            workbook.views = [
              {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 1, visibility: 'visible'
              }
            ]

            let sheet = writeBook.addWorksheet('Sheet 1');
            sheet.getColumn('A').values = apns;
            sheet.getColumn('B').values = permitNums;
            sheet.getColumn('C').values = issuedDates;
            sheet.getColumn('D').values = permitTypes;
            sheet.getColumn('E').values = valuations;
            sheet.getColumn('F').values = owners;
            sheet.getColumn('G').values = permitDistros;

            // console.log(apns);
            writeBook.xlsx.writeFile(writePath)
                .then(function() {
                    // done
                });
   });

    // CREATE NEW WORKBOOK FOR WRITING
    // let writeBook = createAndFillWorkbook();
    // workbook.xlsx.writeFile(writePath)
    // .then(function() {
    //     // done
    // });


// sheet.columns = [
// { header: 'Parcel Number', key: 'apn', width: 10 },  // A
// { header: 'Permit Number', key: 'permitNum', width: 10 }, // B
// { header: 'Issued Date', key: 'issueDate', width: 10 }, // C
// { header: 'Permit Type', key: 'permiteType', width: 10 },  // D
// { header: 'Valuation', key: 'valuation', width: 10 }, // E
// { header: 'Owner', key: 'owner', width: 10 }, // F
// { header: 'Permit Distribution', key: 'permitDistro', width: 10 } // G
// ];
// for (let i = 0; i < apns.length; i++) {
//   console.log(apns[i]);
// }









let usage = () => {
    return "Usage: excelparse.js <path to file> <name of worksheet> <index of raw apn column> <index of target column> <delimiter>"
}
