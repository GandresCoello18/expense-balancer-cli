import { readInputFromFile, readInputFromConsole } from './io';
import { log, cyan } from 'console-log-colors';

async function main() {
  if (process.argv.length > 2) {
    const filePath = process.argv[2];
    readInputFromFile(filePath);
  } else {
    log.red(' 🚧 Nota: para cancelar el proceso usa ctrl + d o ctrl + c 🚧 ');
    log.green(' 🚀 Introduce acontinuación los valores a calcular...');
    readInputFromConsole();
  }
}

main().catch(error => {
  cyan.bgRed.bold.underline(` 😱 Server error: ${error.message}`);
});
