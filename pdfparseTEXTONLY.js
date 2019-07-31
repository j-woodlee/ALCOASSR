const PDF_PATH = "./Partial-SLA-Example.pdf";
const PAGE_NUMBER = 1;
// var PAGE_SCALE = 1.5;
// var SVG_NS = 'http://www.w3.org/2000/svg';

let pdfjsLib = require("pdfjs-dist");

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "./node_modules/pdfjs-dist/build/pdf.worker.js";


let pageLoaded = () => {

    let loadingTask = pdfjsLib.getDocument({ url: PDF_PATH });

    loadingTask.promise.then(function (pdfDocument) {

        pdfDocument.getPage(PAGE_NUMBER).then(function (page) {
            // console.log(pdfDocument.getPage(1));
            // let viewport = page.getViewport({ scale: PAGE_SCALE, });
            console.log(page);
            page.getTextContent().then(function (textContent) {
                // console.log(textContent);
                console.log(textContent);
                grabText(textContent);
            });
        });
    });
};

let grabText = (textContent) => {

    // console.log(textContent);
    textContent.items.forEach((textItem) => {
        console.log(textItem);
    });

};

pageLoaded();
