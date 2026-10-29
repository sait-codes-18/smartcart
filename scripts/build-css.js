const fs = require('fs');
const path = require('path');
const { compile } = require('tailwindcss');

// Collect all candidate class names from src files
function getAllFiles(dir, exts = ['.ts', '.tsx', '.js', '.jsx', '.html']) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        files = files.concat(getAllFiles(full, exts));
      }
    } else if (exts.includes(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

async function build() {
  console.log('Compiling Tailwind CSS...');
  const srcFiles = getAllFiles(path.join(__dirname, '..', 'src'));
  const candidateSet = new Set();

  for (const file of srcFiles) {
    const content = fs.readFileSync(file, 'utf8');
    // Extract words/classes
    const words = content.match(/[A-Za-z0-9_\-\/\[\]\:\#\.\%\<\>\@]+/g) || [];
    for (const w of words) candidateSet.add(w);
  }

  const baseCss = `
    @import "tailwindcss";
    @theme {
      --color-cream: #FBFBEE;
      --color-olive-50: #F4F7EE;
      --color-olive-100: #E8EEDC;
      --color-olive-200: #D5DFBF;
      --color-olive-500: #758852;
      --color-olive-800: #2A3618;
      --color-olive-900: #1D2710;
      --color-terracotta-500: #D9532F;
      --color-terracotta-600: #C24220;
    }
  `;

  const compiler = await compile(baseCss, { base: path.join(__dirname, '..') });
  const css = compiler.build(Array.from(candidateSet));

  const outPath = path.join(__dirname, '..', 'public', 'compiled.css');
  fs.writeFileSync(outPath, css, 'utf8');
  console.log(`Success! Written ${css.length} bytes to ${outPath}`);
}

build().catch(err => {
  console.error('Build error:', err);
  process.exit(1);
});
