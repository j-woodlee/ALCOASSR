let Excel = require('exceljs');
let workbook = new Excel.Workbook();

workbook.xlsx.readFile(process.argv[2])
    .then(function() {
        let worksheet = workbook.getWorksheet(1);
        let apns = worksheet.getColumn(1).values.slice(0);

        apns.shift();
        // apns.shift();

        console.log(apns);

        for (let i = 0; i < apns.length; i++) {
            apns[i] = apns[i].replace(/-/g, '');
        }

        worksheet.getColumn(2).values = apns;
        //let row = worksheet.getRow(5);

        // row.getCell(1).value = 5; // A5's value set to 5
        //row.commit();
        return workbook.xlsx.writeFile(process.argv[2]);
    });




// console.log(process.argv[2]);
