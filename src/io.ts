import * as fs from 'fs';

import { log } from 'console-log-colors';

import { calculateMinimumExchange } from './calculator';
import {
  askNumberOfMembers,
  createInterfaceReadLine,
  logResultsTable,
  parseInput,
} from './shared/helpers/io.helper';

export const readInputFromFile = (filePath: string) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const trips = parseInput(content);
    const results = calculateMinimumExchange(trips);
    logResultsTable(results);
  } catch (error) {
    if (error instanceof Error) {
      log.red(`Error file: ${error.message}`);
    }
  }
};

export const readInputFromConsole = () => {
  const readlineIntf = createInterfaceReadLine();
  askNumberOfMembers({ readlineIntf });
};
