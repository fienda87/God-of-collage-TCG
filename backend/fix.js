const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/controllers/bindersController.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\\`/g, '`').replace(/\\\${/g, '${');
fs.writeFileSync(file, content);
console.log('Fixed ' + file);
