import * as readline from 'readline';

import { log } from 'console-log-colors';

import { validValueRegex } from '../utils/regex.util';

import { isValidRangeValueAllowed, validateMaxMembersAllowed } from './calculator.helper';

import { calculateMinimumExchange } from '@/calculator';

export const parseInput = (input: string): number[][] => {
  const lines = input.trim().split('\n');
  const trips: number[][] = [];
  let currentTrip: number[] = [];

  for (const line of lines) {
    if (line === '>') {
      trips.push(currentTrip);
      currentTrip = [];
    } else if (line.startsWith('$')) {
      const value = line.replace('$', '').replace(',', '.') || 'valor vacio';

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

export const logResultsTable = (results: string[]) => {
  console.log(log.green('Resultados: 👇'));

  const tableData = results.map((result, index) => ({
    Viaje: `#${index + 1} ✈️ `,
    Monto: `$${result} 💰`,
  }));

  console.table(tableData);
};

export const isValidMonetaryValue = (value: string) => {
  if (validValueRegex.test(value)) return true;
  if (isNaN(parseFloat(value))) return false;
  return false;
};

export const createInterfaceReadLine = () =>
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const trips: number[][] = [];

export const askNumberOfMembers = (options: { readlineIntf: readline.Interface }) => {
  const { readlineIntf } = options;

  readlineIntf.question('Digite el número de miembros (0 para salir): ', input => {
    const valueLine = input.trim();
    const numberOfMembersLine = parseFloat(valueLine);

    if (!isValidMonetaryValue(valueLine)) {
      log.red(`⚠️  Entrada no válida. Ingresa un número. ⚠️   ->  ${valueLine}`);
      askNumberOfMembers({ readlineIntf });
    }

    if (numberOfMembersLine === 0) {
      readlineIntf.close();

      const results = calculateMinimumExchange(trips);
      logResultsTable(results);
      return;
    }

    validateMaxMembersAllowed({ count: numberOfMembersLine });
    askExpenses({ numberOfMembersLine, trips, readlineIntf });
  });
};

const askExpenses = (options: {
  numberOfMembersLine: number;
  trips: number[][];
  readlineIntf: readline.Interface;
}) => {
  const { numberOfMembersLine, trips, readlineIntf } = options;
  const expenses: number[] = [];

  const askNextExpense = () => {
    if (expenses.length === numberOfMembersLine) {
      trips.push(expenses);
      log.gray(`✅ Viaje registrado: ${expenses.join(',')}`);
      return askNumberOfMembers({ readlineIntf });
    }

    readlineIntf.question(`Gasto para el miembro #${expenses.length + 1}: `, input => {
      const value = parseFloat(input.replace('$', '').replace(',', '.'));

      if (!isValidMonetaryValue(value.toString()) || !isValidRangeValueAllowed({ value })) {
        log.red('❌ El valor debe estar entre $0.00 y $1000.00');
        return askNextExpense();
      }

      expenses.push(value);
      askNextExpense();
    });
  };

  askNextExpense();
};
