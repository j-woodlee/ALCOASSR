let PDFJS = require('pdfjs-dist');
// let PDFWorker = require('node_modules/pdfjs-dist/lib/pdf.worker.js');

let filePath = "./Partial-SLA-Example.pdf";




let getText = (pdfPath) => {
  let pdf = PDFJS.getDocument(filePath);


  return pdf.then((pdf) => {
      // console.log(pdf.getPage(1));
      let totalPages = pdf.numPages;
      let countPromises = [];

      let page = pdf.getPage(1);
      let txt = "";




      countPromises.push(page.then((page) => {
        let textContent = page.getTextContent();

        return textContent.then((text) => {

            return text.items.map((s) => { console.log(s.str); return s.str; }).join('');
        });
      }));

      // for (let i = 1; i <= totalPages; i++) {
      //   let page = pdf.getPage(i);
      //   let txt = "";
      //
      //
      //
      //
      //
      //   countPromises.push(page.then((page) => {
      //     // console.log(page);
      //     let textContent = page.getTextContent();
      //     return textContent.then((text) => {
      //       return text.items.map((s) => { return s.str; }).join('');
      //     });
      //   }));
      // }
      // console.log(pdf.pdfInfo.numPages);
      return Promise.all(countPromises).then((texts) => {
         return texts.join('');
      });
  });
}

getText(filePath).then((text) => {
  console.log('parse: ' + text);
}, (reason) => {
  console.error(reason);
});




// let getPageText = (pageNum, PDFDocumentInstance) => {
//   return new Promise((resolve, reject) => {
//       PDFDocumentInstance.getPage(pageNum).then((pdfPage) => {
//         pdfPage.getTextContent().then((textContent) => {
//             let textItems = textContent.items;
//             let finalString = "";
//
//             for (let i = 0; i < textItems.length; i++) {
//                 let item = textItems[i];
//
//                 finalString += item.str + " ";
//             }
//
//             resolve(finalString);
//         })
//       })
//   })
// }
