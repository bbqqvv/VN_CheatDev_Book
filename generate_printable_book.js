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

// Strip BOM if present
markdownContent = markdownContent.replace(/^\uFEFF/, '');

// Add TOC placeholder if not present (optional, but good for navigation)
if (!markdownContent.includes('${toc}')) {
    // Insert TOC after the first header 1 or 2
    // Simple hack: Put it after Table of Contents line
    // markdownContent = markdownContent.replace('## 📑 MỤC LỤC (Table of Contents)', '## 📑 MỤC LỤC (Table of Contents)\n${toc}');
}

console.log('Rendering HTML...');
const htmlContent = md.render(markdownContent);

const finalHtml = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[VN] CheatDev Book - Printable</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&family=JetBrains+Mono:wght@400;700&display=swap');

        :root {
            --primary: #2c3e50;
            --accent: #e74c3c;
            --code-bg: #f8f9fa;
            --border: #eaecef;
        }

        body {
            font-family: 'Merriweather', serif;
            line-height: 1.8;
            color: #333;
            max-width: 210mm; /* A4 width */
            margin: 0 auto;
            padding: 2cm;
            background: white;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            color: var(--primary);
            font-weight: 700;
        }

        h1 { font-size: 2.5em; border-bottom: 3px solid var(--primary); padding-bottom: 10px; break-before: page; }
        h2 { font-size: 1.8em; border-bottom: 1px solid var(--border); padding-bottom: 5px; margin-top: 2em; }
        h3 { font-size: 1.4em; }

        p { margin-bottom: 1.2em; text-align: justify; }

        a { color: var(--accent); text-decoration: none; }
        a:hover { text-decoration: underline; }

        /* CODE BLOCKS */
        pre {
            background: var(--code-bg);
            padding: 1em;
            border-radius: 5px;
            border: 1px solid var(--border);
            overflow-x: auto;
            page-break-inside: avoid;
        }
        code {
            font-family: 'JetBrains Mono', monospace;
            background: rgba(27,31,35,0.05);
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-size: 0.9em;
        }
        pre code {
            background: none;
            padding: 0;
            font-size: 0.85em;
        }

        /* IMAGES */
        img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 2em auto;
            border: 1px solid #ddd;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        /* TABLES */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 2em 0;
            page-break-inside: avoid;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th { background: #f2f2f2; font-weight: bold; }

        /* BLOCKQUOTES */
        blockquote {
            border-left: 5px solid var(--primary);
            margin: 1.5em 0;
            padding-left: 1em;
            font-style: italic;
            background: #f9f9f9;
            padding: 1em;
        }

        /* PRINT SETTINGS */
        @media print {
            body { 
                padding: 0; 
                max-width: 100%; 
            }
            @page {
                size: A4;
                margin: 2cm;
            }
            a { text-decoration: none; color: black; }
            h1 { break-before: always; }
            h2 { break-after: avoid; }
            img { max-height: 50vh; }
            
            /* Hide non-print elements if any */
            .no-print { display: none; }
        }

        /* Cover Page Hack */
        .cover-title {
            text-align: center;
            margin-top: 30vh;
            font-size: 4em;
            line-height: 1.2;
        }
        .cover-subtitle {
            text-align: center;
            font-size: 1.5em;
            color: #666;
            margin-top: 2em;
        }
        .cover-author {
            text-align: center;
            font-size: 1.2em;
            margin-top: 5em;
            font-weight: bold;
        }
    </style>
</head>
<body>
    
    <!-- Custom Cover Page -->
    <div style="break-after: page; height: 90vh;">
        <h1 class="cover-title" style="border: none;">[VN] CheatDev Book</h1>
        <p class="cover-subtitle">Từ Zero đến Hero: Game Hacking & Reverse Engineering</p>
        <p class="cover-author">VTech Digital Solution</p>
    </div>

    ${htmlContent}

    <div style="text-align: center; margin-top: 5em; border-top: 1px solid #ddd; padding-top: 1em; font-size: 0.8em; color: #888;">
        Published by VTech Digital Solution &copy; ${new Date().getFullYear()}
    </div>
</body>
</html>
`;

fs.writeFileSync(outputFile, finalHtml, 'utf8');
console.log('SUCCESS! Open this file in browser to print: ' + outputFile);
