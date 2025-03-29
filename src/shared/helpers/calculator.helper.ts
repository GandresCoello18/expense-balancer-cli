import { CENTS_IN_DOLLAR } from '../utils/time.util';

export const convertToCents = (amount: number) => {
  return Math.round(amount * CENTS_IN_DOLLAR);
};

export const calculateAverage = (options: { total: number; count: number }) => {
  const { total, count } = options;
  return Math.floor(total / count);
};

export const calculateAdjustment = (options: { total: number; average: number; count: number }) => {
  const { total, average, count } = options;
  return total - average * count;
};
