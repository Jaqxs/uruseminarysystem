const fs = require('fs');
const content = fs.readFileSync('c:/Users/HP/Downloads/bender-school-nexus/src/lib/translations.ts', 'utf8');

function findDuplicates(objStr) {
    const lines = objStr.split('\n');
    const keys = [];
    const duplicates = [];
    lines.forEach((line, i) => {
        const match = line.match(/^\s+([a-zA-Z0-9]+):/);
        if (match) {
            const key = match[1];
            if (keys.includes(key)) {
                duplicates.push({ key, line: i + 1 });
            }
            keys.push(key);
        }
    });
    return duplicates;
}

// Split en and sw
const enMatch = content.match(/en: \{([\s\S]+?)\s+\},\s+sw:/);
const swMatch = content.match(/sw: \{([\s\S]+?)\s+\}\s+\};/);

if (enMatch) {
    console.log("EN Duplicates:");
    console.log(findDuplicates(enMatch[1]));
}
if (swMatch) {
    console.log("SW Duplicates:");
    console.log(findDuplicates(swMatch[1]));
}
