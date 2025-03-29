import * as fs from 'fs';
import * as readline from 'readline';

import { log } from 'console-log-colors';

import { calculateMinimumExchange } from './calculator';
import { parseInput } from './shared/helpers/io.helper';

export const readInputFromFile = (filePath: string) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const trips = parseInput(content);
    const results = calculateMinimumExchange(trips);
    log.green('\nResultados: 👇 ');
    results.forEach((result, index) => {
      console.log(` ✈️  Viaje #${index + 1}: $${result} 💰 `);
    });
  } catch (error) {
    if (error instanceof Error) {
      log.red(`Error file: ${error.message}`);
    }
  }
};

export const readInputFromConsole = () => {
  const readlineIntf = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const trips: number[][] = [];
  const currentTrip: number[] = [];

  readlineIntf.on('line', input => {
    const valueLine = parseFloat(input.trim());

    if (valueLine === 0) {
      if (currentTrip.length > 0) trips.push(currentTrip);
      readlineIntf.close();

      const results = calculateMinimumExchange(trips);
      log.green('\nResultados: 👇 ');
      results.forEach((result, index) => {
        console.log(` ✈️  Viaje #${index + 1}: $${result} 💰 `);
      });

      return;
    }

    if (!isNaN(valueLine)) currentTrip.push(valueLine);
    else log.yellow(' ⚠️  Entrada no válida. Ingresa un número. ⚠️ ');
  });
};
