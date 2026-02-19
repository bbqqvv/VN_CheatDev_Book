const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const anchor = require('markdown-it-anchor');
const toc = require('markdown-it-toc-done-right');

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
})
    .use(anchor, { permalink: anchor.permalink.headerLink() })
    .use(toc);

const inputFile = path.join(__dirname, 'FULL_BOOK.md');
const outputFile = path.join(__dirname, 'VN_CheatDev_Book_Printable.html');

console.log('Reading ' + inputFile + '...');
let markdownContent = fs.readFileSync(inputFile, 'utf8');
markdownContent = markdownContent.replace(/^\uFEFF/, '');

console.log('Rendering HTML...');
const htmlContent = md.render(markdownContent);

const finalHtml = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[VN] CheatDev Book - Legendary Edition</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&family=JetBrains+Mono:wght@400;700&display=swap');
        :root { --primary: #2c3e50; --accent: #00ff41; --code-bg: #f8f9fa; --border: #eaecef; }
        body { font-family: 'Merriweather', serif; line-height: 1.8; color: #333; max-width: 210mm; margin: 0 auto; padding: 2cm; background: white; }
        h1, h2, h3 { font-family: sans-serif; color: var(--primary); margin-top: 1.5em; }
        h1 { font-size: 2.5em; border-bottom: 4px solid var(--accent); padding-bottom: 10px; break-before: page; }
        pre { background: #1e1e1e; color: #d4d4d4; padding: 1.5em; border-radius: 8px; font-size: 0.9em; page-break-inside: avoid; }
        code { font-family: 'JetBrains Mono', monospace; font-weight: bold; }
        img { max-width: 100%; height: auto; display: block; margin: 2em auto; border: 2px solid #00ff41; border-radius: 5px; }
        blockquote { border-left: 5px solid #00ff41; background: #f0fff0; padding: 1em; font-style: italic; }
        @media print { body { padding: 0; } @page { size: A4; margin: 2cm; } h1 { break-before: always; } }
    </style>
</head>
<body>
    <div style="text-align: center; margin-top: 30vh; break-after: page;">
        <h1 style="border: none; font-size: 4em;">[VN] CheatDev Book</h1>
        <h2 style="color: #666;">The Legendary Edition</h2>
        <p style="margin-top: 10em; font-weight: bold;">VTech Digital Solution</p>
    </div>
    ${htmlContent}
</body>
</html>
`;

fs.writeFileSync(outputFile, finalHtml, 'utf8');
console.log('SUCCESS: ' + outputFile);
