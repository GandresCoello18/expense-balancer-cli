/* eslint-disable @typescript-eslint/no-floating-promises */
import { log } from 'console-log-colors';

import { ExpenseCalculatorService } from './application/services/expense-calculator.service';
import {
  ConsoleInputHandler,
  createReadlineInterface,
} from './infrastructure/input/console-input.handler';
import { FileInputHandler } from './infrastructure/input/file-input.handler';
import {
  TableOutputFormatterWithConsoleTable,
  ConsoleOutputHandler,
} from './infrastructure/output/console-output.handler';
import { FileReadError, ValidationError, FileParseError } from './shared/errors/app.error';

function createFileInputHandler(filePath: string): FileInputHandler {
  if (!filePath.endsWith('.txt')) {
    throw new ValidationError(
      'El archivo de entrada debe tener la extensión .txt',
      'INVALID_FILE_EXTENSION',
    );
  }
  return new FileInputHandler({ filePath });
}

function createConsoleInputHandler(): ConsoleInputHandler {
  return new ConsoleInputHandler({ readlineInterface: createReadlineInterface() });
}

async function main(): Promise<void> {
  try {
    const outputFormatter = new TableOutputFormatterWithConsoleTable();
    const outputHandler = new ConsoleOutputHandler();
    const service = new ExpenseCalculatorService(outputFormatter, outputHandler);

    if (process.argv.length > 2) {
      const filePath = process.argv[2];
      const inputHandler = createFileInputHandler(filePath);
      await service.process(inputHandler);
    } else {
      log.red(' 🚧 Nota: para cancelar el proceso usa ctrl + d o ctrl + c 🚧 ');
      log.green(' 🚀 A continuación responde las preguntas e ingresa los valores a calcular...');
      const inputHandler = createConsoleInputHandler();
      await service.process(inputHandler);
    }
  } catch (error) {
    if (
      error instanceof FileReadError ||
      error instanceof FileParseError ||
      error instanceof ValidationError
    ) {
      log.red(`❌ ${error.message}`);
      process.exit(1);
    }
    if (error instanceof Error) {
      log.red(`❌ Error inesperado: ${error.message}`);
      process.exit(1);
    }
    log.red('❌ Error desconocido');
    process.exit(1);
  }
}

(async () => {
  log.greenBright('😎 App corriendo..!');
  await main();
})();
