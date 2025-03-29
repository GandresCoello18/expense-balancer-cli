import { log } from 'console-log-colors';

import { validValueRegex } from '../utils/regex.util';

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

      if (!isValidMonetaryValue(value) || isNaN(parseFloat(value))) {
        log.red(`Error: se encontraron valores no admitidos -> ${value}`);
        process.exit(1);
      }

      currentTrip.push(parseFloat(value));
    }
  }

  if (currentTrip.length > 0) trips.push(currentTrip);
  return trips;
};

export const isValidMonetaryValue = (value: string) => {
  if (validValueRegex.test(value)) return true;
  return false;
};
