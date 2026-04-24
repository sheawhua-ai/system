import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace standard colors to brand specifically for specific links
content = content.replace(/text-blue-600/g, 'text-brand');
content = content.replace(/border-blue-600/g, 'border-brand');
content = content.replace(/hover:text-blue-600/g, 'hover:text-brand');
content = content.replace(/hover:bg-blue-700/g, 'hover:bg-brand-hover');
content = content.replace(/bg-blue-600/g, 'bg-brand');
content = content.replace(/text-emerald-700/g, 'text-gray-700');
content = content.replace(/bg-emerald-100/g, 'bg-gray-100 border border-gray-200');


fs.writeFileSync('src/App.tsx', content);
console.log('Final color replacements deployed.');
