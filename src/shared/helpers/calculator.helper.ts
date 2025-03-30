import { CENTS_IN_DOLLAR } from '../utils/coin.util';

export const convertToCents = (amount: number) => {
  return Math.round(amount * CENTS_IN_DOLLAR);
};

export const calculateAverage = (options: { total: number; count: number }) => {
  const { total, count } = options;
  return Math.floor(total / count);
};

export const replaceLine = (line: string) => line.replace('$', '').replace(',', '.');
