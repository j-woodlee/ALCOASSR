let Excel = require("exceljs");

let workbook = new Excel.Workbook();

let agency = process.argv[2];
let year = process.argv[3];
let month = process.argv[4];

let readPath = "P:\\Permits List\\Files Received From Unit Supervisors\\" + agency + "\\" + year + "\\"
+ year + "-" + month + " " + agency + " Permits to write.xlsm";

let worksheetName = year + "-" + month + " " + agency.substring(0,3).toUpperCase() + " Issued";

let delimiter = process.argv[5] ? process.argv[5] : "-";

let writePath = "P:\\Permits List\\Upload Files\\Testing\\" + agency + "\\" + year + "\\"
+ year + "-" + month + " " + agency + " Permits" + " parcelized.xlsx";

console.log("Reading from: " + "\"" + readPath + "\"");

let apns = [], permitNums = [], issuedDates = [], permitTypes = [], valuations= [], applicantNames= [], permitDescs = [], originalAPNs = [];
let apnIndex = "A", permitNumIndex = "H", issuedDateIndex = "I", permitTypeIndex = "D",
    valuationIndex = "E", applicantNameIndex = "J", permitDescIndex = "F";

workbook.xlsx.readFile(readPath)
    .then(() => {

        let worksheet = workbook.getWorksheet(worksheetName);

        let regex1 = new RegExp("^[0-9]{2,4}[a-zA-Z]{0,1}([-]{1}|[ ]{1})[0-9]{4}([-]{1}|[ ]{1})[0-9]{3}([-]{1}|[ ]{1})[0-9]{0,3}$"); // apns that need formatting
        let regex2 = new RegExp("^[0-9]{3}-[0-9]{3,4}-[0-9]{1,2}$"); // another format for APNs
        let regex3 = new RegExp("^[0-9]{3}-[0-9]{3,4}-[0-9]{3}$"); // another format for APNs

        let originalAPN, apn, permitNum, issuedDate, permitType, valuation, applicantName, permitDesc;
        worksheet.eachRow((row) => {

            originalAPN = row.getCell(apnIndex).value;
            apn = row.getCell(apnIndex).value;
            permitNum = row.getCell(permitNumIndex).value;
            issuedDate = row.getCell(issuedDateIndex).value;
            permitType = row.getCell(permitTypeIndex).value;
            valuation = row.getCell(valuationIndex).value;
            applicantName = row.getCell(applicantNameIndex).value;
            permitDesc = row.getCell(permitDescIndex).value;

            // if there is a permit type, add each value in the row to their array
            // only add the rows that have either an already good APN or one that is in the proper format for modification
            if (permitType !== null) {
                regex1.lastIndex = 0;
                regex2.lastIndex = 0;
                regex3.lastIndex = 0;

                // apn logic
                if (regex1.test(apn)) {
                    let apnArray = apn.split(delimiter);
                    let book = apnArray[0] === undefined ? "" : apnArray[0].replace(/\s/g, ""); // remove all spaces if it is not undefined
                    let page = apnArray[1] === undefined ? "" : apnArray[1].replace(/\s/g, "");
                    let parcel = apnArray[2] === undefined ? "" : apnArray[2].replace(/\s/g, "");
                    let subPN = apnArray[3] === undefined ? "00" : apnArray[3].replace(/\s/g, "");

                    if (book.length < 4) {
                        if (book.match(/[a-z]/i)) { // if the book has an alpha character
                            // we want to add a leading zero
                            book = "0" + book;
                        } else {
                            // or we want to add a trailing space in all other cases
                            book = book + " ";
                        }
                    }
                    // concatenate all 4 strings to create the complete parcel number
                    apn = book + page +  parcel + subPN;
                } else if (regex2.test(apn)) {
                    let apnArray = apn.split("-");
                    let page = apnArray[1].length > 3 ? apnArray[1] : "0" + apnArray[1];
                    let parcel = apnArray[2].length > 1 ? "0" + apnArray[2] : "00" + apnArray[2];
                    apn = apnArray[0] + " " + page + parcel + "00";  // book + page + parcel + subPN
                } else if (regex3.test(apn)) {
                    let apnArray = apn.split("-");
                    let page = apnArray[1].length > 3 ? apnArray[1] : "0" + apnArray[1];
                    apn = apnArray[0] + " " + page + apnArray[2] + "00";  // book + page + parcel + subPN
                }

                // permit number logic
                permitNum = permitNum.toString().substring(0,12); // truncate to 12 characters

                // description logic
                permitDesc = ("(" + permitNum + ") " + permitDesc).substring(0,253);

                // add each data point to their arrays
                originalAPNs.push(originalAPN);
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
        writeBook.views = [
            {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 1, visibility: "visible"
            }
        ];

        let sheet = writeBook.addWorksheet("Sheet 1");
        sheet.columns = [
            { header: "Original Parcel Number", key: "originalAPN", width: 16 },
            { header: "Parcel Number", key: "apn", width: 16 },  // A
            { header: "Permit Number", key: "permitNum", width: 15 }, // B
            { header: "Issued Date", key: "issueDate", width: 15 }, // C
            { header: "Permit Type", key: "permitType", width: 15 },  // D
            { header: "Valuation", key: "valuation", width: 15 }, // E
            { header: "Applicant Name", key: "applicantName", width: 25 }, // F
            { header: "Permit Description", key: "permitDesc", width: 20 } // G
        ];

        sheet.getColumn("A").values = originalAPNs;
        sheet.getColumn("B").values = apns;
        sheet.getColumn("C").values = permitNums;
        sheet.getColumn("D").values = issuedDates;
        sheet.getColumn("E").values = permitTypes;
        sheet.getColumn("F").values = valuations;
        sheet.getColumn("G").values = applicantNames;
        sheet.getColumn("H").values = permitDescs;

        console.log("Writing to: " + "\"" + writePath + "\"");
        writeBook.xlsx.writeFile(writePath);
    });
