import { log } from 'console-log-colors';

import { readInputFromFile, readInputFromConsole } from './io';

function main() {
  if (process.argv.length > 2) {
    const filePath = process.argv[2];
    readInputFromFile(filePath);
  } else {
    log.red(' 🚧 Nota: para cancelar el proceso usa ctrl + d o ctrl + c 🚧 ');
    log.green(' 🚀 Introduce acontinuación los valores a calcular...');
    readInputFromConsole();
  }
}

(() => {
  log.greenBright(` 😎 App corriendo..!`);
  main();
})();
