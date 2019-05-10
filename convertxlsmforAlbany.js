let Excel = require("exceljs");

let readAndCreate = (workbook, readPath, writePath, worksheetName) => {
    let apns = [], permitNums = [], issuedDates = [], permitTypes = [], valuations= [], applicantNames= [], permitDescs = [];

    workbook.xlsx.readFile(readPath)
        .then(() => {
            let apnIndex = "A", permitNumIndex = "H", issuedDateIndex = "I", permitTypeIndex = "D",
                valuationIndex = "E", applicantNameIndex = "J", permitDescIndex = "F";

            let worksheet = workbook.getWorksheet(worksheetName);

            let apn, permitNum, issuedDate, permitType, valuation, applicantName, permitDesc;
            worksheet.eachRow((row) => {

                if (row.getCell("D").value !== null) {
                    apn = row.getCell(apnIndex).value;
                    permitNum = row.getCell(permitNumIndex).value;
                    issuedDate = row.getCell(issuedDateIndex).value;
                    permitType = row.getCell(permitTypeIndex).value;
                    valuation = row.getCell(valuationIndex).value;
                    applicantName = row.getCell(applicantNameIndex).value;
                    permitDesc = row.getCell(permitDescIndex).value;

                    // permit number logic
                    permitNum = permitNum.substring(0,12); // truncate to 12 characters

                    // description logic
                    permitDesc = permitDesc.substring(0,250);

                    apns.push(apn);
                    permitNums.push(permitNum);
                    issuedDates.push(issuedDate);
                    permitTypes.push(permitType);
                    valuations.push(valuation);
                    applicantNames.push(applicantName);
                    permitDescs.push(permitDesc);
                }
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
                { header: "Parcel Number", key: "apn", width: 15 },  // A
                { header: "Permit Number", key: "permitNum", width: 15 }, // B
                { header: "Issued Date", key: "issueDate", width: 15 }, // C
                { header: "Permit Type", key: "permitType", width: 15 },  // D
                { header: "Valuation", key: "valuation", width: 15 }, // E
                { header: "Applicant Name", key: "applicantName", width: 25 }, // F
                { header: "Permit Description", key: "permitDesc", width: 20 } // G
            ];
            sheet.getColumn("A").values = apns;
            sheet.getColumn("B").values = permitNums;
            sheet.getColumn("C").values = issuedDates;
            sheet.getColumn("D").values = permitTypes;
            sheet.getColumn("E").values = valuations;
            sheet.getColumn("F").values = applicantNames;
            sheet.getColumn("G").values = permitDescs;

            // console.log(apns);
            writeBook.xlsx.writeFile(writePath)
                .then(function() {
                    // done
                });
        });
};

module.exports.readAndCreate = readAndCreate;
