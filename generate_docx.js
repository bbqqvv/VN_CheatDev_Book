const fs = require('fs');
const path = require('path');
const HTMLtoDOCX = require('html-to-docx');
const { JSDOM } = require('jsdom');

const InputHTML = path.join(__dirname, 'VN_CheatDev_Book_Printable.html');
const OutputDOCX = path.join(__dirname, 'VN_CheatDev_Book_Legendary.docx');

async function generate() {
    console.log('Reading HTML...');
    let htmlContent = fs.readFileSync(InputHTML, 'utf8');

    // Clean up HTML for conversion if necessary (e.g. removing some print-specific styles that might confuse the converter)
    // For now, pass it raw.

    console.log('Converting to DOCX...');

    // HTMLtoDOCX options
    const fileBuffer = await HTMLtoDOCX(htmlContent, null, {
        table: { row: { cantSplit: true } },
        footer: true,
        pageNumber: true,
        font: 'Times New Roman',
        title: '[VN] CheatDev Book'
    });

    fs.writeFileSync(OutputDOCX, fileBuffer);
    console.log(`SUCCESS! Word file generated: ${OutputDOCX}`);
}

generate().catch(console.error);
