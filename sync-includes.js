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
  const headerBlockRegex = /<!-- INCLUDE: header -->[\s\S]*?<!-- \/INCLUDE: header -->|<div id="header-include">[\s\S]*?<\/div>|<!-- Top Announcement \/ Hotline Bar -->[\s\S]*?(?=<main id="mainContent">)/;

  if (headerBlockRegex.test(content)) {
    const replacement = `<!-- INCLUDE: header -->\n<div id="header-include">\n${headerContent}\n</div>\n<!-- /INCLUDE: header -->\n`;
    content = content.replace(headerBlockRegex, replacement);
  }

  // 2. Clean up everything between </main> and the scripts to cleanly embed the footer include
  const afterMainRegex = /(<\/main>)[\s\S]*?(?=(?:<!-- Core JavaScript -->|<script src="app\.js"><\/script>))/;

  if (afterMainRegex.test(content)) {
    const replacement = `$1\n\n  <!-- INCLUDE: footer -->\n<div id="footer-include">\n${footerContent}\n</div>\n<!-- /INCLUDE: footer -->\n\n`;
    content = content.replace(afterMainRegex, replacement);
  } else {
    // Fallback if </main> not found
    const footerBlockRegex = /<!-- INCLUDE: footer -->[\s\S]*?<!-- \/INCLUDE: footer -->|<div id="footer-include">[\s\S]*?<\/div>|(?:<!-- Sticky Mobile Action Bar -->|<!-- FOOTER -->|<footer class="main-footer">)[\s\S]*?(?=(?:<!-- Core JavaScript -->|<script src="app\.js"><\/script>))/;
    if (footerBlockRegex.test(content)) {
      const replacement = `<!-- INCLUDE: footer -->\n<div id="footer-include">\n${footerContent}\n</div>\n<!-- /INCLUDE: footer -->\n`;
      content = content.replace(footerBlockRegex, replacement);
    }
  }

  // 3. Update Phone Numbers across content
  content = content.replace(/tel:\+?1?6040000000/g, 'tel:+17782441332');
  content = content.replace(/\+1\s*\(\s*604\s*\)\s*000-0000/g, '(778) 244-1332');
  content = content.replace(/\+1\s*\(\s*604\s*\)\s*XXX-XXXX/g, '(778) XXX-XXXX');
  content = content.replace(/16040000000/g, '17782441332');
  content = content.replace(/\+16040000000/g, '+17782441332');

  // 4. Update Emails across content
  content = content.replace(/onpointhomecare2026@gmail\.com/g, 'hello@onpointhomecare.care');
  content = content.replace(/care@onpointhomecare\.care/g, 'hello@onpointhomecare.care');

  // 5. Update Service Areas across content
  content = content.replace(/(?:Vancouver,\s*)?Burnaby,\s*Surrey,\s*New Westminster\s*&amp;\s*Richmond/g, 'Vancouver, Burnaby, Surrey, New Westminster &amp; Richmond');
  content = content.replace(/(?:Vancouver,\s*)?Burnaby,\s*Surrey,\s*New Westminster\s*&\s*Richmond/g, 'Vancouver, Burnaby, Surrey, New Westminster & Richmond');
  content = content.replace(/(?:Vancouver,\s*)?Burnaby,\s*Surrey,\s*New Westminster\s*and\s*Richmond/g, 'Vancouver, Burnaby, Surrey, New Westminster and Richmond');
  content = content.replace(/(?:Vancouver,\s*)?Burnaby,\s*Surrey,\s*New Westminster,\s*Richmond/g, 'Vancouver, Burnaby, Surrey, New Westminster, Richmond');
  content = content.replace(/Vancouver,\s*Richmond,\s*Burnaby,\s*Surrey/g, 'Vancouver, Burnaby, Surrey, New Westminster & Richmond');

  // 5. Clean up placeholder tags in content
  content = content.replace(/\s*<span[^>]*class="placeholder-tag"[^>]*>[\s\S]*?<\/span>/g, '');

  // 6. Handle Index page specific card
  if (file === 'index.html') {
    const waCardRegex = /<!-- WhatsApp Quick Action -->[\s\S]*?<\/div>\s*<\/div>\s*(?=<!-- Lead Form -->)/;
    if (waCardRegex.test(content)) {
      const fbCard = `<!-- Facebook Social Connect -->\n            <a href="https://www.facebook.com/profile.php?id=61590981071077" target="_blank" rel="noopener noreferrer" class="social-connect-card">\n              <div class="sc-icon">\n                <svg viewBox="0 0 24 24" fill="currentColor">\n                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>\n                </svg>\n              </div>\n              <div class="sc-info">\n                <h4 class="sc-title">Connect on Facebook</h4>\n                <p class="sc-desc">Follow OnPoint Nurse &amp; Home Care for clinical tips, updates &amp; community support.</p>\n              </div>\n              <span class="sc-btn-tag">Follow Us &rarr;</span>\n            </a>\n          </div>\n\n          `;
      content = content.replace(waCardRegex, fbCard);
    }
    content = content.replace(/(?:Vancouver,\s*)?Burnaby,\s*Surrey,\s*New Westminster\s*&amp;\s*Richmond,\s*BC/g, 'Vancouver, Burnaby, Surrey, New Westminster &amp; Richmond, BC');
  }

  // 7. Handle Contact page specific layout
  if (file === 'contact.html') {
    content = content.replace(/\+1 \(604\) 000-0000/g, '(778) 244-1332');
    content = content.replace(/(?:Vancouver,\s*)?Burnaby,\s*Surrey,\s*New Westminster\s*&amp;\s*Richmond,\s*BC/g, 'Vancouver, Burnaby, Surrey, New Westminster &amp; Richmond, BC');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updatedCount++;
  console.log(`Synced & updated: ${file}`);
});

console.log(`Successfully synced and updated all ${updatedCount} HTML files.`);
