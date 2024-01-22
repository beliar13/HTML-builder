const fs = require('fs');
const path = require('path');

let entity, fname, fsize;
const folder = path.join(__dirname, 'secret-folder');
fs.promises
  .readdir(folder, { withFileTypes: true })
  .then(async (files) => {
    for (let file of files) {
      const stats = await fs.promises.stat(
        path.join(__dirname, 'secret-folder', file.name),
      );

      if (file.isFile()) {
        fname = file.name.split('.').slice(0, -1).join('');
        entity = path.extname(file.name).slice(1);
        fsize = (stats.size / 1024).toFixed(2);
        console.log(`${fname}\t ${entity} \t ${fsize} Kb`);
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });