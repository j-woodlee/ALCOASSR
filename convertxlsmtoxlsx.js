let Alameda = require("./convertxlsmforAlameda.js");
let Albany = require("./convertxlsmforAlbany.js");
let Excel = require("exceljs");

let workbook = new Excel.Workbook();

let agency = process.argv[2];
let year = process.argv[3];
let fileName = process.argv[4];

let readPath = "P:\\Permits List\\Upload Files\\Testing\\" + agency + "\\" + year + "\\" + fileName + ".xlsm";

let worksheetName = process.argv[5];

let delimiter = process.argv[6] ? process.argv[6] : '-';

let writePath = "P:\\Permits List\\Upload Files\\Testing\\" + agency + "\\" + year + "\\" + fileName + ".xlsx";

switch(agency) {
  case "Alameda":
    Alameda.readAndCreate(workbook, readPath, writePath, worksheetName);
    break;
  case "Albany":
    Albany.readAndCreate(workbook, readPath, writePath, worksheetName);
    break;
  default:
    break;
}
