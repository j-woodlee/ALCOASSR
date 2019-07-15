let Excel = require("exceljs");

let readAndCreate = (workbook, readPath, writePath, worksheetName, delimiter) => {
    console.log("Reading from: " + "\"" + readPath + "\"");

    let apns = [], permitNums = [], issuedDates = [], permitTypes = [], valuations= [], applicantNames= [], permitDescs = [];
    let apnIndex = "A", permitNumIndex = "H", issuedDateIndex = "I", permitTypeIndex = "D",
        valuationIndex = "E", applicantNameIndex = "L", permitDescIndex = "F";

    workbook.xlsx.readFile(readPath)
        .then(() => {

            let worksheet = workbook.getWorksheet(worksheetName);



            let regex1 = new RegExp("[0-9]{3,4}[a-zA-Z]{0,1}([-]{1}|[ ]{1})[0-9]{4}([-]{1}|[ ]{1})[0-9]{3}([-]{1}|[ ]{1})[0-9]{0,2}"); // apns that need formatting
            let regex2 = new RegExp("[0-9]{3}([ ]{1}|[A-Za-z]{1})[0-9]+"); // finished APN expression

            let apn, permitNum, issuedDate, permitType, valuation, applicantName, permitDesc;
            worksheet.eachRow((row) => {

                apn = row.getCell(apnIndex).value;
                permitNum = row.getCell(permitNumIndex).value;
                issuedDate = row.getCell(issuedDateIndex).value;
                permitType = row.getCell(permitTypeIndex).value;
                valuation = row.getCell(valuationIndex).value;
                applicantName = row.getCell(applicantNameIndex).value;
                permitDesc = row.getCell(permitDescIndex).value;

                // if there is a permit type, add each value in the row to their array
                // only add the rows that have either an already good APN or one that is in the proper format for modification
                if (permitType !== null && (regex1.test(apn) || regex2.test(apn))) {

                    // apn logic
                    if (regex1.test(apn)) {
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
                    permitDesc = ("(" + permitNum + ") " + permitDesc).substring(0,253);

                    // console.log(apn);
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

            apns.unshift("Parcel Numbers");
            permitNums.unshift("Permit Numbers");
            issuedDates.unshift("Issued Dates");
            permitTypes.unshift("Permit Types");
            valuations.unshift("Valuations");
            applicantNames.unshift("Applicant Names");
            permitDescs.unshift("Permit Description");

            sheet.getColumn("A").values = apns;
            sheet.getColumn("B").values = permitNums;
            sheet.getColumn("C").values = issuedDates;
            sheet.getColumn("D").values = permitTypes;
            sheet.getColumn("E").values = valuations;
            sheet.getColumn("F").values = applicantNames;
            sheet.getColumn("G").values = permitDescs;

            console.log("Writing to: " + "\"" + writePath + "\"");
            writeBook.xlsx.writeFile(writePath)
                .then(function() {
                    // done
                });
        });
};

module.exports.readAndCreate = readAndCreate;
