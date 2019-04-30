
let filePath  = "./Partial-SLA-Example.pdf";

const PDFExtract = require('pdf.js-extract').PDFExtract;
// import {PDFExtract} from 'pdf.js-extract'; // or with typescript
const pdfExtract = new PDFExtract();

const options = {
   firstPage: 1, // default:`1` - start extract at page nr
   lastPage: 1, //  stop extract at page nr, no default value
   /*password?: string;*/ //  for decrypting password-protected PDFs., no default value
   verbosity: -1, // default:`-1` - log level of pdf.js
   normalizeWhitespace: false, // default:`false` - replaces all occurrences of whitespace with standard spaces (0x20).
   disableCombineTextItems: false // default:`false` - do not attempt to combine  same line {@link TextItem}'s.
}; /* see below */

pdfExtract.extract(filePath, options, (err, data) => {
    if (err) return console.log(err);
    console.log(data);
});
