const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

stdout.write('Speak to me Lord\n');
fs.writeFile(path.join(__dirname, 'speach.txt'), '', (err) => {
  if (err) throw err;
});

let data = '';

stdin.on('data', (chunk) => {
  if (chunk.toString().slice(0, chunk.toString().length - 2) === 'exit') {
    process.exit();
  }
  data += chunk;
  fs.createWriteStream(path.join(__dirname, 'speach.txt')).write(data);
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => stdout.write('\nGoodbye!'));