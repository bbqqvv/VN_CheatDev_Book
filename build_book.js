const fs = require('fs');
const path = require('path');

const outputDocs = path.join(__dirname, 'FULL_BOOK.md');
const glossaryFile = path.join(__dirname, 'GLOSSARY.md');
const adminFile = path.join(__dirname, 'ADMIN_PAGES.md');

// List of chapters in correct order
const chapters = [
    '01_Nen_Tang_Tu_Duy',
    '02_Cong_Cu_Than_Thanh',
    '03_Lap_Trinh_External',
    '04_Lap_Trinh_Internal',
    '05_Mobile_Hacking',
    '06_Reverse_Engineering_Advanced',
    '07_Networking_Packet_Hacking',
    '08_Kernel_Driver_Development',
    '09_AntiCheat_Evasion',
    '10_Final_Projects'
];

let fullContent = `---
title: "[VN] CheatDev Book: The Legendary Edition"
author: "VTech Digital Solution"
date: "2026-02-19"
---
`;

// 1. Append Admin Pages (Copyright, About, etc.)
if (fs.existsSync(adminFile)) {
    console.log('Prepending Admin Pages...');
    fullContent += fs.readFileSync(adminFile, 'utf8') + '\n\n';
}

// 2. Append Table of Contents Placeholder
fullContent += `## 📑 MỤC LỤC (Table of Contents)\n\${toc}\n\n---\n\n`;

// 3. Append Chapters
chapters.forEach(dir => {
    const readmePath = path.join(__dirname, dir, 'README.md');
    if (fs.existsSync(readmePath)) {
        console.log(`Processing ${dir}...`);
        let content = fs.readFileSync(readmePath, 'utf8');

        // Remove metadata headers if present (--- ... ---)
        content = content.replace(/^---\n[\s\S]*?\n---\n/, '');
        // Fix image paths: "images/pic.png" -> "01_Nen_Tang_Tu_Duy/images/pic.png"
        content = content.replace(/\]\(images\//g, `](${dir}/images/`);

        fullContent += content + '\n\n<div style="page-break-after: always;"></div>\n\n';
    } else {
        console.warn(`MISSING: ${dir}/README.md`);
    }
});

// 4. Append Glossary
if (fs.existsSync(glossaryFile)) {
    console.log('Appending Glossary...');
    let glossary = fs.readFileSync(glossaryFile, 'utf8');
    fullContent += glossary;
}

fs.writeFileSync(outputDocs, fullContent, 'utf8');
console.log(`SUCCESS! Book compiled to: ${outputDocs}`);
