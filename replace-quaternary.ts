import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace the specific red accents in Dedupe with brand-light/gray scale where appropriate
// to avoid too many colors. 

// 1. Group active background from blue to brand-light
content = content.replace(/bg-blue-50 border-blue-200/g, 'bg-brand-light/20 border-brand/30');
content = content.replace(/bg-blue-100 text-blue-700/g, 'bg-brand-light/40 text-brand');
content = content.replace(/text-blue-900/g, 'text-brand');

// 2. Score tags
content = content.replace(/text-red-500 font-medium bg-red-50/g, 'text-brand font-medium bg-brand-light/30');

// 3. Overall group list background
content = content.replace(/bg-gray-100\/50/g, 'bg-gray-50');

fs.writeFileSync('src/App.tsx', content);
console.log('Quaternary replacements completed successfully.');
