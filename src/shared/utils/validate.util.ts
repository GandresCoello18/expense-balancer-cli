import { log } from 'console-log-colors';

import { MAx_MEMBERS_ALLOWED_BY_TRIP, MAx_VALUE_ALLOWED_BY_MEMBER } from './calculator.util';
import { validValueRegex } from './regex.util';

import { CalculatorModel } from '@/model/calculator.model';

export const isValidMonetaryValue = (value: string) => {
  if (validValueRegex.test(value)) return true;
  if (isNaN(parseFloat(value))) return false;
  return false;
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

export const validateRangeValueAllowedByTrip = (options: Pick<CalculatorModel, 'trip'>) => {
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
