import * as fs from 'fs';

import { log } from 'console-log-colors';

import {
  inputMemberCount,
  createInterfaceReadLine,
  parseInputFile,
} from '../shared/helpers/io.helper';
import { logResultsTable } from '../shared/utils/log.util';

import { calculateMinimumExchange } from './calculator.service';

export const readInputFromFile = (filePath: string) => {
  try {
    const input = fs.readFileSync(filePath, 'utf-8');
    const trips = parseInputFile({ input });
    const results = calculateMinimumExchange({ trips });
    logResultsTable(results);
  } catch (error) {
    if (error instanceof Error) {
      log.red(`Error file: ${error.message}`);
    }
  }
};

export const readInputFromConsole = () => {
  const readlineIntf = createInterfaceReadLine();
  inputMemberCount({ readlineIntf });
};
