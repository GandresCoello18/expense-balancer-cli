import * as fs from 'fs';
import * as readline from 'readline';

import { log } from 'console-log-colors';

import { calculateMinimumExchange } from './calculator';
import { parseInput } from './shared/helpers/io.helper';

export const readInputFromFile = (filePath: string): number[][] => {
  const content = fs.readFileSync(filePath, 'utf-8');
  return parseInput(content);
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
