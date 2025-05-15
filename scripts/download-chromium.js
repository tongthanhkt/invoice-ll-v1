const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create /tmp directory if it doesn't exist
if (!fs.existsSync('/tmp')) {
    fs.mkdirSync('/tmp');
}

// Download Chromium
console.log('Downloading Chromium...');
execSync('npx @sparticuz/chromium download', { stdio: 'inherit' });

// Copy Chromium to /tmp
console.log('Copying Chromium to /tmp...');
const chromiumPath = path.join(process.cwd(), 'node_modules/@sparticuz/chromium/bin/chromium');
fs.copyFileSync(chromiumPath, '/tmp/chromium');
fs.chmodSync('/tmp/chromium', '755');

console.log('Chromium setup complete!'); 