#!/usr/bin/env node
/**
 * Pre-render syntax highlighting for HTML files
 * This script processes HTML files and adds syntax highlighting spans
 * so that only CSS is needed at runtime (no JavaScript required)
 * 
 * Usage: node highlight.js
 * Or: npm run highlight
 */

const fs = require('fs');
const path = require('path');
const Prism = require('prismjs');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-yaml');
require('prismjs/components/prism-bash');

function highlightCodeBlocks(html) {
  // Match code blocks with language classes: <code class="language-xxx">...</code>
  return html.replace(/<code class="language-(\w+)">([\s\S]*?)<\/code>/g, (match, language, code) => {
    // Trim whitespace from code
    const trimmedCode = code.trim();
    
    // Highlight the code using Prism
    let highlighted;
    try {
      if (Prism.languages[language]) {
        highlighted = Prism.highlight(trimmedCode, Prism.languages[language], language);
      } else {
        // Fallback: just escape HTML
        highlighted = Prism.util.encode(trimmedCode);
      }
    } catch (e) {
      // If highlighting fails, just escape
      highlighted = Prism.util.encode(trimmedCode);
    }
    
    // Return the highlighted code with the same class
    return `<code class="language-${language}">${highlighted}</code>`;
  });
}

function processFile(filePath) {
  console.log(`Processing ${filePath}...`);
  const html = fs.readFileSync(filePath, 'utf8');
  const highlighted = highlightCodeBlocks(html);
  fs.writeFileSync(filePath, highlighted, 'utf8');
  console.log(`✓ Highlighted ${filePath}`);
}

// Process all HTML files
const htmlFiles = ['index.html', 'terms.html', 'privacy.html', 'sitemap.html'];
htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    processFile(filePath);
  }
});

console.log('✓ All files processed!');

