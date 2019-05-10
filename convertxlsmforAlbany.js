let Excel = require("exceljs");

let readAndCreate = (workbook, readPath, writePath, worksheetName) => {
    let apns = [], permitNums = [], issuedDates = [], permitTypes = [], valuations= [], owners= [], permitDescs = [];

    workbook.xlsx.readFile(readPath)
        .then(() => {
            let apnIndex, permitNumIndex, issuedDateIndex, permitTypeIndex, valuationIndex, ownerIndex, permitDescIndex;

            let worksheet = workbook.getWorksheet(worksheetName);

            // Iterate over all non-null cells in a row
            // identify headers
            let headers = worksheet.getRow(1);
            headers.eachCell((cell, colNumber) => {
                switch(cell.value) {
                case "Parcel Number":
                    apnIndex = colNumber;
                    break;
                case "Permit #":
                    permitNumIndex = colNumber;
                    break;
                case "Issued\r\nDate ":
                    issuedDateIndex = colNumber;
                    break;
                case "Permit Type":
                    permitTypeIndex = colNumber;
                    break;
                case "Valuation":
                    valuationIndex = colNumber;
                    break;
                case "Applicant Name":
                    ownerIndex = colNumber;
                    break;
                case "Permit Desciription":
                    permitDescIndex = colNumber;
                    break;
                default:
                    break;
                }
            });

            let apn, permitNum, issuedDate, permitType, valuation, owner, permitDesc;
            // console.log(apnIndex + " " + permitNumIndex + " " + issuedDateIndex);
            worksheet.eachRow((row) => {

                if (row.getCell("D").value !== null) {
                    apn = row.getCell(apnIndex).value;
                    permitNum = row.getCell(permitNumIndex).value;
                    issuedDate = row.getCell(issuedDateIndex).value;
                    permitType = row.getCell(permitTypeIndex).value;
                    valuation = row.getCell(valuationIndex).value;
                    owner = row.getCell(ownerIndex).value;
                    permitDesc = row.getCell(permitDescIndex).value;

                    // permit number logic
                    permitNum = permitNum.substring(0,12); // truncate to 12 characters

                    // description logic
                    permitDesc = permitDesc.substring(0,250);
                    // console.log(apn);
                    apns.push(apn);
                    permitNums.push(permitNum);
                    issuedDates.push(issuedDate);
                    permitTypes.push(permitType);
                    valuations.push(valuation);
                    owners.push(owner);
                    permitDescs.push(permitDesc);
                }
                // console.log(apn + ", " + permitNum + ", " + issuedDate + ", " + permitType + ", " +
                // valuation + ", " + owner + ", " + permitDesc);
            });


            let writeBook = new Excel.Workbook();
            writeBook.creator = "Jake Woodlee";
            writeBook.lastModifiedBy = "Jake Woodlee";
            writeBook.created = new Date();
            writeBook.modified = new Date();
            writeBook.lastPrinted = new Date();
            workbook.views = [
                {
                    x: 0, y: 0, width: 10000, height: 20000,
                    firstSheet: 0, activeTab: 1, visibility: "visible"
                }
            ];

            let sheet = writeBook.addWorksheet("Sheet 1");
            sheet.columns = [
                { header: "Parcel Number", key: "apn", width: 20 },  // A
                { header: "Permit Number", key: "permitNum", width: 20 }, // B
                { header: "Issued Date", key: "issueDate", width: 20 }, // C
                { header: "Permit Type", key: "permiteType", width: 20 },  // D
                { header: "Valuation", key: "valuation", width: 20 }, // E
                { header: "Owner", key: "owner", width: 20 }, // F
                { header: "Permit Description", key: "permitDesc", width: 20 } // G
            ];
            sheet.getColumn("A").values = apns;
            sheet.getColumn("B").values = permitNums;
            sheet.getColumn("C").values = issuedDates;
            sheet.getColumn("D").values = permitTypes;
            sheet.getColumn("E").values = valuations;
            sheet.getColumn("F").values = owners;
            sheet.getColumn("G").values = permitDescs;

            // console.log(apns);
            writeBook.xlsx.writeFile(writePath)
                .then(function() {
                    // done
                });
        });
};

module.exports.readAndCreate = readAndCreate;
