const fs = require('fs');
const path = require('path');

const outputPath = './src/service-worker-list.json';

// According to the need, add or remove directories from this array
const targetFolders = [
  { name: 'core', path: './public/lib/core/' },
  { name: 'ui', path: './public/lib/ui/', getNestedFiles: true },
  { name: 'pdf', path: './public/lib/core/pdf', getNestedFiles: true },
  { name: 'office', path: './public/lib/core/office', getNestedFiles: true },
  { name: 'legacyOffice', path: './public/lib/core/legacyOffice', getNestedFiles: true },
  { name: 'external', path: './public/lib/core/external', getNestedFiles: true },
];

function getAllFiles(dirObject, fileList = []) {
  const files = fs.readdirSync(dirObject.path);

  files.forEach(file => {
    const filePath = path.join(dirObject.path, file);

    if (!fs.statSync(filePath).isDirectory()) {
      fileList.push(filePath);
    } else {
      if (dirObject.getNestedFiles) {
        getAllFiles({ name: file, path: filePath, getNestedFiles: true }, fileList);
      }
    }
  });

  return fileList;
}

const filesByDirectories = {};

targetFolders.forEach(folderObject => {
  const files = getAllFiles(folderObject);
  filesByDirectories[folderObject.name] = files;
});

const jsonResult = JSON.stringify(filesByDirectories);

fs.writeFileSync(outputPath, jsonResult);

console.log('Service worker list prepared');