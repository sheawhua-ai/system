const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf-8');

const regex = /(text|bg|border)-(red|blue|emerald|green|orange|yellow|amber|slate)-([0-9]{2,3})/g;
let match;
const found = new Set();
while ((match = regex.exec(content)) !== null) {
  found.add(match[0]);
}
console.log(Array.from(found).sort().join('\n'));
