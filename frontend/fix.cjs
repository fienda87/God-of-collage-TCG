const fs = require('fs');
const files = [
  'src/store/binderStore.ts',
  'src/pages/Binders/BindersPage.tsx',
  'src/components/Binders/CreateBinderModal.tsx',
  'src/components/Binders/BinderSlotGrid.tsx',
  'src/components/Binders/BinderSlot.tsx',
  'src/components/Binders/AddCardModal.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/\\\`/g, '`').replace(/\\\${/g, '${');
  fs.writeFileSync(f, content);
  console.log('Fixed ' + f);
});
