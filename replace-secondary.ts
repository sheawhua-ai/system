import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Active Tab Indicators
content = content.replace(/border-black text-black/g, 'border-brand text-brand');

// Other specific text accents
content = content.replace(/text-black focus:ring-black/g, 'text-brand focus:ring-brand');
content = content.replace(/focus:border-black focus:ring-black/g, 'focus:border-brand focus:ring-brand');
content = content.replace(/focus-within:border-black focus-within:ring-black/g, 'focus-within:border-brand focus-within:ring-brand');
content = content.replace(/border-black text-white/g, 'border-brand text-white');
content = content.replace(/hover:border-black/g, 'hover:border-brand');
content = content.replace(/focus:border-black/g, 'focus:border-brand');

fs.writeFileSync('src/App.tsx', content);
console.log('Secondary replacements completed successfully.');
