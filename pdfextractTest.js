

let PDFJS = require('pdfjs-dist');

PDFJS.disableTextLayer = true;
PDFJS.disableWorker = true;

const getPageText = async (pdf: Pdf, pageNo: number) => {
  const page = await pdf.getPage(pageNo);
  const tokenizedText = await page.getTextContent();
  const pageText = tokenizedText.items.map(token => token.str).join("");
  return pageText;
};

export const getPDFText = async (source: PDFSource): Promise<string> => {
  const pdf: Pdf = await PDFJS.getDocument(source).promise;
  const maxPages = pdf.numPages;
  const pageTextPromises = [];
  for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
    pageTextPromises.push(getPageText(pdf, pageNo));
  }
  const pageTexts = await Promise.all(pageTextPromises);
  return pageTexts.join(" ");
};
