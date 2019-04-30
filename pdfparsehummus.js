let hummus = require('hummus');
let extractText = require('./lib/text-extraction');

let filePath = "./HighLevelContentContext.pdf";
let writer = hummus.createWriterToModify(filePath);

let reader = hummus.createReader(filePath);


let pagesPlacements = extractText(reader);

console.log('pages text placements', JSON.stringify(pagesPlacements,null,2));
