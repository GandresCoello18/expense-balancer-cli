import { log } from 'console-log-colors';

export const parseInput = (input: string): number[][] => {
    const lines = input.trim().split('\n');
    const numberOfTrips = parseInt(lines[lines.length - 1], 10);
    const trips: number[][] = [];
  
    let currentTrip: number[] = [];
    for (const line of lines.slice(0, -1)) {
      if (line === '>') {
        trips.push(currentTrip);
        currentTrip = [];
      } else if (line.startsWith('F')) {
        const value = parseFloat(line.split(' ')[1].replace('$', '').replace(',', '.'));
        currentTrip.push(value);
      }
    }
    if (currentTrip.length > 0) trips.push(currentTrip);
  
    if (trips.length !== numberOfTrips) {
      log.red(' 🛑 Número de viajes no coincide con el número especificado  🛑 ');
      process.exit(0);
    }
  
    return trips;
  };