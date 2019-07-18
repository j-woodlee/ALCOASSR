let Alameda = require("./convertxlsmforAlameda.js");
// let Albany = require("./convertxlsmforAlbany.js");
let Excel = require("exceljs");

let workbook = new Excel.Workbook();

let agency = process.argv[2];
let year = process.argv[3];
let month = process.argv[4];

let readPath = "P:\\Permits List\\Files Received From Unit Supervisors\\" + agency + "\\" + year + "\\"
+ year + "-" + month + " " + agency + " Permits to write.xlsm";

let worksheetName = year + "-" + month + " " + agency.substring(0,3).toUpperCase() + " Issued";

let delimiter = process.argv[6] ? process.argv[6] : "-";

let writePath = "P:\\Permits List\\Upload Files\\Testing\\" + agency + "\\" + year + "\\"
+ year + "-" + month + " " + agency + " Permits" + " parcelized.xlsx";


Alameda.readAndCreate(workbook, readPath, writePath, worksheetName, delimiter);

// switch(agency) {
// case "Alameda":
//     Alameda.readAndCreate(workbook, readPath, writePath, worksheetName, delimiter);
//     break;
// case "Albany":
//     Alameda.readAndCreate(workbook, readPath, writePath, worksheetName, delimiter);
//     break;
// case "Berkeley":
//     Alameda.readAndCreate(workbook, readPath, writePath, worksheetName, delimiter);
//     break;
// case "Emeryville":
//     Alameda.readAndCreate(workbook, readPath, writePath, worksheetName, delimiter);
//     break;
// case "Livermore":
//     Alameda.readAndCreate(workbook, readPath, writePath, worksheetName, delimiter);
//     break;
// case "Fremont":
//     Alameda.readAndCreate(workbook, readPath, writePath, worksheetName, delimiter);
//     break;
// case "Hayward":
//     Alameda.readAndCreate(workbook, readPath, writePath, worksheetName, delimiter);
//     break;
// case "Oakland":
//     Alameda.readAndCreate(workbook, readPath, writePath, worksheetName, delimiter);
//     break;
// default:
//     break;
// }

// P:\Permits List\Files Received From Unit Supervisors\<Agency>\2019
