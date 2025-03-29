import { log } from 'console-log-colors';

import { MAx_MEMBERS_ALLOWED_BY_TRIP, MAx_VALUE_ALLOWED_BY_MEMBER } from '../utils/calculator.util';
import { CENTS_IN_DOLLAR } from '../utils/coin.util';

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

export const validateMaxMembersAllowed = (options: { count: number }) => {
  const { count } = options;
  if (count > MAx_MEMBERS_ALLOWED_BY_TRIP) {
    log.red(
      `El número maximo de miembros por viaje es de ${MAx_MEMBERS_ALLOWED_BY_TRIP}. Se encontro que un viaje contiene ${count} miembros`,
    );
    process.exit(1);
  }
};

export const validateRangeValueAllowedByTrip = (options: { trip: number[] }) => {
  const { trip } = options;

  const rangeValueInvalid = trip.find(expense => !isValidRangeValueAllowed({ value: expense }));
  if (typeof rangeValueInvalid === 'number') {
    log.red(
      `Se encontro gastos fuera del rango permitido (min $0 y maximo $${MAx_VALUE_ALLOWED_BY_MEMBER}). Error -> ${rangeValueInvalid}`,
    );
    process.exit(1);
  }
};

export const isValidRangeValueAllowed = (options: { value: number }) => {
  const { value } = options;
  return value >= 0 && value <= MAx_VALUE_ALLOWED_BY_MEMBER;
};
