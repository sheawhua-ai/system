const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace all non-brand red/blue/emerald/slate backgrounds in Tag and related areas with generic gray scale and brand accents
// The user wants B-end iOS minimal (often meaning neutral grays + single brand color)

// Re-write Tag color map
content = content.replace(/blue: 'bg-blue-50 text-blue-600 border-blue-200'/g, "blue: 'bg-brand-light/30 text-brand border-brand/20'");
content = content.replace(/orange: 'bg-orange-50 text-orange-600 border-orange-200'/g, "orange: 'bg-brand-light/30 text-brand border-brand/20'");
content = content.replace(/green: 'bg-emerald-50 text-emerald-600 border-emerald-200'/g, "green: 'bg-brand-light/30 text-brand border-brand/20'");
content = content.replace(/red: 'bg-red-50 text-red-600 border-red-200'/g, "red: 'bg-brand-light/30 text-brand border-brand/20'");
content = content.replace(/cyan: 'bg-cyan-50 text-cyan-600 border-cyan-200'/g, "cyan: 'bg-gray-100 text-gray-700 border-gray-200'");
content = content.replace(/purple: 'bg-purple-50 text-purple-600 border-purple-200'/g, "purple: 'bg-brand-light/30 text-brand border-brand/20'");

// Slate -> Gray general replacement
content = content.replace(/slate-/g, 'gray-');

// Specific status elements (from old emerald, blue, etc. to brand/gray)
content = content.replace(/bg-emerald-500/g, 'bg-brand');
content = content.replace(/bg-red-500/g, 'bg-gray-400');
content = content.replace(/bg-amber-500/g, 'bg-gray-400');
content = content.replace(/bg-blue-500/g, 'bg-brand');

// Any remaining blue backgrounds or text to brand
content = content.replace(/bg-blue-50/g, 'bg-brand-light/20');
content = content.replace(/text-blue-/g, 'text-brand ');
content = content.replace(/border-blue-/g, 'border-brand/30 ');
content = content.replace(/bg-blue-/g, 'bg-brand ');

// Check deduplication / info areas 
content = content.replace(/bg-emerald-50/g, 'bg-gray-50');
content = content.replace(/text-emerald-600/g, 'text-gray-700');
content = content.replace(/border-emerald-100/g, 'border-gray-200');

content = content.replace(/bg-orange-50/g, 'bg-gray-50');
content = content.replace(/text-orange-600/g, 'text-gray-700');
content = content.replace(/border-orange-100/g, 'border-gray-200');
content = content.replace(/border-orange-200/g, 'border-gray-300');

content = content.replace(/bg-orange-600/g, 'bg-gray-800');
content = content.replace(/hover:bg-orange-700/g, 'hover:bg-black');

content = content.replace(/bg-red-50/g, 'bg-gray-50');
content = content.replace(/text-red-600/g, 'text-gray-700');
content = content.replace(/border-red-200/g, 'border-gray-200');
content = content.replace(/bg-red-100/g, 'bg-gray-100');
content = content.replace(/text-red-700/g, 'text-gray-700');
content = content.replace(/text-red-500/g, 'text-gray-500'); // Note: keep an eye on mandatory asterisks span className="text-red-500" - wait, let's just make mandatory asterisks gray or brand. B-end iOS usually keeps it brand or minimal red. We will change them to text-brand.

fs.writeFileSync('src/App.tsx', content);
console.log('Colors replaced successfully.');
