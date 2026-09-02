const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const includesDir = path.join(projectDir, 'includes');

const headerPath = path.join(includesDir, 'header.html');
const footerPath = path.join(includesDir, 'footer.html');

if (!fs.existsSync(headerPath) || !fs.existsSync(footerPath)) {
  console.error('Error: includes/header.html or includes/footer.html missing!');
  process.exit(1);
}

const headerContent = fs.readFileSync(headerPath, 'utf8').trim();
const footerContent = fs.readFileSync(footerPath, 'utf8').trim();

const htmlFiles = fs.readdirSync(projectDir).filter(file => file.endsWith('.html') && !file.startsWith('_'));

let updatedCount = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(projectDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace or insert Header include block
  // Pattern matches from <!-- INCLUDE: header -->...<!-- /INCLUDE: header --> OR from <div id="header-include">...</div> OR from <!-- Top Announcement... to <main id="mainContent">
  const headerBlockRegex = /<!-- INCLUDE: header -->[\s\S]*?<!-- \/INCLUDE: header -->|<div id="header-include">[\s\S]*?<\/div>|<!-- Top Announcement \/ Hotline Bar -->[\s\S]*?(?=<main id="mainContent">)/;

  if (headerBlockRegex.test(content)) {
    const replacement = `<!-- INCLUDE: header -->\n<div id="header-include">\n${headerContent}\n</div>\n<!-- /INCLUDE: header -->\n`;
    content = content.replace(headerBlockRegex, replacement);
  }

  // 2. Replace or insert Footer include block
  // Pattern matches from <!-- INCLUDE: footer -->...<!-- /INCLUDE: footer --> OR from <div id="footer-include">...</div> OR from <!-- Sticky Mobile Action Bar -->... to <script src="app.js"> OR <!-- FOOTER -->...
  const footerBlockRegex = /<!-- INCLUDE: footer -->[\s\S]*?<!-- \/INCLUDE: footer -->|<div id="footer-include">[\s\S]*?<\/div>|(?:<!-- Sticky Mobile Action Bar -->|<!-- FOOTER -->|<footer class="main-footer">)[\s\S]*?(?=(?:<!-- Core JavaScript -->|<script src="app\.js"><\/script>))/;

  if (footerBlockRegex.test(content)) {
    const replacement = `<!-- INCLUDE: footer -->\n<div id="footer-include">\n${footerContent}\n</div>\n<!-- /INCLUDE: footer -->\n`;
    content = content.replace(footerBlockRegex, replacement);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updatedCount++;
  console.log(`Synced includes into: ${file}`);
});

console.log(`Successfully synced includes across all ${updatedCount} HTML files.`);
