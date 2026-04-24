import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Also update the fundsTab borders to use brand instead of emerald
content = content.replace(/border-emerald-500 text-gray-700/g, 'border-brand text-brand');
content = content.replace(/border-blue-500/g, 'border-brand/40');
content = content.replace(/hover:bg-emerald-600/g, 'hover:bg-brand-hover');

content = content.replace(/bg-orange-400/g, 'bg-gray-700');
content = content.replace(/hover:bg-gray-500/g, 'hover:bg-gray-800');

fs.writeFileSync('src/App.tsx', content);
console.log('Tertiary fund styles adjusted.');
