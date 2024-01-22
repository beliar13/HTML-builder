const path = require('path');
const fs = require('fs');
const { error } = require('console');

const dest = path.join(__dirname, 'files-copy');
const src = path.join(__dirname, 'files');

fs.stat(dest, (err) => {
  if (err) {
    if (err.errno === -4058) {
      fs.mkdir(dest, (err) => {
        if (err) throw err;
      });
    }
  }
});

fs.promises
  .readdir(dest, { withFileTypes: true })
  .then((files) => {
    for (let file of files) {
      fs.promises.unlink(path.join(dest, file.name));
    }
  })
  .catch((err) => {
    console.log(err);
  });

fs.promises
  .readdir(src, { withFileTypes: true })
  .then((files) => {
    for (let file of files) {
      fs.promises.copyFile(
        path.join(src, file.name),
        path.join(dest, file.name),
      );
    }
  })
  .catch((err) => {
    console.log(err);
  });
