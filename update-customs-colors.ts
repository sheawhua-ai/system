import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace standard colors to brand specifically
content = content.replace(/bg-black text-white rounded text-sm hover:bg-gray-800/g, 'bg-brand text-white rounded text-sm hover:bg-brand-hover');

fs.writeFileSync('src/App.tsx', content);
console.log('Colors replaced successfully');
