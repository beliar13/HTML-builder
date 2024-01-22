const fs = require('fs');
const path = require('path');

const cssFolder = path.join(__dirname, 'styles');
const projFolder = path.join(__dirname, 'project-dist');

fs.access(path.join(projFolder, 'bundle.css'), fs.F_OK, (err) => {
  if (!err) {
    fs.promises.unlink(path.join(projFolder, 'bundle.css'));
  }
  return;
});

fs.promises
  .readdir(cssFolder, { withFileTypes: true })
  .then((files) => {
    for (let file of files) {
      fext = file.name.split('.').slice(-1).join('');
      if (fext === 'css') {
        input = fs.createReadStream(path.join(cssFolder, file.name), 'utf-8');
        output = fs.createWriteStream(path.join(projFolder, 'bundle.css'));

        input.on('data', (data) => {
          output.write(data);
        });
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
