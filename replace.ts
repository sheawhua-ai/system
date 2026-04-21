import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replacements for Buttons
content = content.replace(/className="([^"]*)bg-black([^"]*)text-white([^"]*)hover:bg-slate-800([^"]*)"/g, 'className="$1bg-brand$2text-white$3hover:bg-brand-hover$4"');
content = content.replace(/className="([^"]*)bg-black([^"]*)text-white([^"]*)hover:bg-gray-800([^"]*)"/g, 'className="$1bg-brand$2text-white$3hover:bg-brand-hover$4"');
content = content.replace(/className="([^"]*)bg-black([^"]*)hover:bg-slate-800([^"]*)text-white([^"]*)"/g, 'className="$1bg-brand$2hover:bg-brand-hover$3text-white$4"');
content = content.replace(/className="([^"]*)bg-black([^"]*)hover:bg-gray-800([^"]*)text-white([^"]*)"/g, 'className="$1bg-brand$2hover:bg-brand-hover$3text-white$4"');

// Other specific primary button targets
content = content.replace(/disabled:hover:bg-black/g, 'disabled:hover:bg-brand');

// Other specific targets where color represents the main accent:
// Target the "Public SPU" dark label backgrounds
content = content.replace(/bg-black text-white text-xs px-2 py-1/g, 'bg-brand text-white text-xs px-2 py-1');
content = content.replace(/bg-black text-white text-xs px-3 py-1/g, 'bg-brand text-white text-xs px-3 py-1');
content = content.replace(/border-2 border-black/g, 'border-2 border-brand');

fs.writeFileSync('src/App.tsx', content);
console.log('Replacements completed successfully.');
