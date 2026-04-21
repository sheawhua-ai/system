import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Sidebar active nav state
content = content.replace(/bg-gray-100 text-black font-medium border-r-2 border-black/g, 'bg-gray-100 text-brand font-medium border-r-2 border-brand');

// Table Action Links
content = content.replace(/className="text-black hover:underline font-medium"/g, 'className="text-brand hover:underline font-medium"');

fs.writeFileSync('src/App.tsx', content);
console.log('Tertiary replacements completed successfully.');
