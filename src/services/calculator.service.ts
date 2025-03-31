import {
  validateMaxMembersAllowed,
  validateRangeValueAllowedByTrip,
} from '..//shared/utils/validate.util';
import { CalculatorModel } from '../model/calculator.model';
import { calculateAverage } from '../shared/helpers/calculator.helper';
import { CENTS_IN_DOLLAR } from '../shared/utils/coin.util';

export const calculateMinimumExchange = (options: Pick<CalculatorModel, 'trips'>) => {
  const { trips } = options;
  const results = [];

  for (const trip of trips) {
    validateMaxMembersAllowed({ count: trip.length });
    validateRangeValueAllowedByTrip({ trip });

    const expenses = trip.map(expense => Math.round(expense * CENTS_IN_DOLLAR));
    const total = expenses.reduce((acc, exp) => acc + exp, 0);
    const average = calculateAverage({ total, count: expenses.length });

    let positiveDifference = 0;
    let negativeDifference = 0;

    for (const expense of expenses) {
      const difference = expense - average;

      if (difference > 0) {
        positiveDifference += difference;
      } else {
        negativeDifference -= difference;
      }
    }

    const exchange = Math.min(positiveDifference, negativeDifference);
    const result = (exchange / CENTS_IN_DOLLAR).toFixed(2);
    results.push(result);
  }

  return results;
};
