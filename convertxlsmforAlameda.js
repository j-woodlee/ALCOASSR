let Excel = require("exceljs");

let readAndCreate = (workbook, readPath, writePath, worksheetName, delimiter) => {
    let apns = [], permitNums = [], issuedDates = [], permitTypes = [], valuations= [], owners= [], permitDescs = [];

    workbook.xlsx.readFile(readPath)
        .then(() => {

            let worksheet = workbook.getWorksheet(worksheetName);

            let regex1 = new RegExp("[0-9]*[a-zA-Z]{1}[0-9]*[a-zA-Z]{1}[0-9]*");
            let apn, permitNum, issuedDate, permitType, valuation, owner, permitDesc;
            worksheet.eachRow((row /*, rowNumber */) => {
                // if there is a permit type, add each value in the row to their array
                if (row.getCell("D").value !== null) {
                    apn = row.getCell("A").value;
                    permitNum = row.getCell("H").value;
                    issuedDate = row.getCell("I").value;
                    permitType = row.getCell("D").value;
                    valuation = row.getCell("E").value;
                    owner = row.getCell("L").value;
                    permitDesc = row.getCell("F").value;

                    // apn logic
                    if (!regex1.test(apn)) {
                        // console.log("regex does not terminate: " + apn);
                        let apnArray = apn.split(delimiter);


                        let book = apnArray[0] === undefined ? "" : apnArray[0].replace(/\s/g, ""); // remove all spaces
                        let page = apnArray[1] === undefined ? "" : apnArray[1].replace(/\s/g, "");
                        let parcel = apnArray[2] === undefined ? "" : apnArray[2].replace(/\s/g, "");
                        let subPN = apnArray[3] === undefined ? "00" : apnArray[3].replace(/\s/g, "");

                        if (book.length < 4) {
                            book = book + " ";
                        }
                        // concatenate all 4 strings
                        apn = book + page +  parcel + subPN;
                    }


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
                { header: "Parcel Number", key: "apn", width: 10 },  // A
                { header: "Permit Number", key: "permitNum", width: 10 }, // B
                { header: "Issued Date", key: "issueDate", width: 20 }, // C
                { header: "Permit Type", key: "permiteType", width: 10 },  // D
                { header: "Valuation", key: "valuation", width: 10 }, // E
                { header: "Owner", key: "owner", width: 10 }, // F
                { header: "Permit Description", key: "permitDesc", width: 10 } // G
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
