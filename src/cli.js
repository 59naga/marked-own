// Dependencies
import program from 'commander';
import packageJson from '../package.json';

// Don't use `require` until just before for speed up command line.
// import express from 'express';
// import markedOwn from './';

// Main
program
  .version(packageJson.version)
  .option('-c, --cwd <path>', 'Change static server base <path>', process.cwd())
  .option('-p, --port <number>', 'Change listen port <number>', process.env.PORT || 59798)
  .option('-u, --use <path>', 'Add stylus plugin at <path[,path...]>')
  .parse(process.argv);

// Routes & Boot
const app = require('express')();
app.use(require('./')(program.cwd, program));
app.listen(program.port, () => {
  console.log(`
 ______              _             _
|  ___ \\            | |           | |
| | _ | | ____  ____| |  _ ____ _ | |___ ___  _ _ _ ____
| || || |/ _  |/ ___) | / ) _  ) || (___) _ \\| | | |  _ \\
| || || ( ( | | |   | |< ( (/ ( (_| |  | |_| | | | | | | |
|_||_||_|\\_||_|_|   |_| \\_)____)____|   \\___/ \\____|_| |_|

                http://localhost:${program.port}`);
});
