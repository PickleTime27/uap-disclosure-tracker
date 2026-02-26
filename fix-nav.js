const fs = require('fs');
let n = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
n = n.replace(
  "{ href: '/whistleblowers', label: 'Key Players', icon: '\u2295' },",
  "{ href: '/whistleblowers', label: 'Key Players', icon: '\u2295' },\n  { href: '/videos', label: 'Videos', icon: '\u25B6' },"
);
fs.writeFileSync('src/components/layout/Navbar.tsx', n, 'utf8');
console.log(n.includes('/videos') ? 'DONE' : 'FAILED');