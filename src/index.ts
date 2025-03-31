import { log } from 'console-log-colors';

import { readInputFromFile, readInputFromConsole } from './services/io.service';

function main() {
  if (process.argv.length > 2) {
    const filePath = process.argv[2];
    if (!filePath.endsWith('.txt')) {
      log.red('❌ Error: El archivo de entrada debe tener la extensión .txt');
      process.exit(1); 
    }
    readInputFromFile(filePath);
  } else {
    log.red(' 🚧 Nota: para cancelar el proceso usa ctrl + d o ctrl + c 🚧 ');
    log.green(' 🚀 Acontinuación responde las preguntas e ingresa los valores a calcular...');
    readInputFromConsole();
  }
}

(() => {
  log.greenBright(` 😎 App corriendo..!`);
  main();
})();
