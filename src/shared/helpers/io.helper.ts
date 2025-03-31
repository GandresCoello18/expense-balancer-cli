import * as readline from 'readline';

import { log } from 'console-log-colors';

import { CalculatorModel } from '../../model/calculator.model';
import { calculateMinimumExchange } from '../../services/calculator.service';
import { END_PROCESS } from '../utils/calculator.util';
import { logResultsTable } from '../utils/log.util';
import {
  isValidMonetaryValue,
  isValidRangeValueAllowed,
  validateMaxMembersAllowed,
} from '../utils/validate.util';

import { replaceLine } from './calculator.helper';

export const createInterfaceReadLine = () =>
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

export const parseInputFile = (options: { input: string }) => {
  const { input } = options;
  const lines = input.trim().split('\n');
  const trips: CalculatorModel['trips'] = [];
  let currentTrip: CalculatorModel['trip'] = [];

  for (const line of lines) {
    if (line === '>') {
      trips.push(currentTrip);
      currentTrip = [];
    } else if (line.startsWith('$')) {
      const value = replaceLine(line) || 'valor vacio';

      if (!isValidMonetaryValue(value)) {
        log.red(`Error: se encontraron valores no admitidos -> ${value}`);
        process.exit(1);
      }

      currentTrip.push(parseFloat(value));
    }
  }

  if (currentTrip.length > 0) trips.push(currentTrip);
  return trips;
};

const trips: CalculatorModel['trips'] = [];
export const inputMemberCount = (options: Pick<CalculatorModel, 'readlineIntf'>) => {
  const { readlineIntf } = options;

  readlineIntf.question('Digite el número de miembros (0 para salir): ', input => {
    const valueLine = input.trim();
    const numberOfMembersLine = parseFloat(valueLine);

    if (!isValidMonetaryValue(valueLine)) {
      log.red(`⚠️  Entrada no válida. Ingresa un número. ⚠️   ->  ${valueLine}`);
      inputMemberCount({ readlineIntf });
    }

    if (numberOfMembersLine === END_PROCESS) {
      readlineIntf.close();

      const results = calculateMinimumExchange({ trips });
      logResultsTable(results);
      return;
    }

    validateMaxMembersAllowed({ count: numberOfMembersLine });
    inputMemberExpenses({ numberOfMembersLine, trips, readlineIntf });
  });
};

export const inputMemberExpenses = (
  options: Pick<CalculatorModel, 'numberOfMembersLine' | 'trips' | 'readlineIntf'>,
) => {
  const { numberOfMembersLine, trips, readlineIntf } = options;
  const expenses: CalculatorModel['expenses'] = [];

  const inputNextExpense = () => {
    if (expenses.length === numberOfMembersLine) {
      trips.push(expenses);
      log.gray(`✅ Viaje registrado: ${expenses.join(',')}`);
      return inputMemberCount({ readlineIntf });
    }

    readlineIntf.question(`Gasto para el miembro #${expenses.length + 1}: `, input => {
      const value = parseFloat(input.replace('$', '').replace(',', '.'));

      if (!isValidMonetaryValue(value.toString()) || !isValidRangeValueAllowed({ value })) {
        log.red('❌ El valor debe estar entre $0.00 y $1000.00');
        return inputNextExpense();
      }

      expenses.push(value);
      inputNextExpense();
    });
  };

  inputNextExpense();
};
