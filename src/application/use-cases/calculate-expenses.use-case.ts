import { CalculatorDomain } from '../../domain/calculator/calculator.domain';
import { CalculationResult, MultipleTripsExpenses, TripResult } from '../../domain/types';

export class CalculateExpensesUseCase {
  public execute(trips: MultipleTripsExpenses): CalculationResult {
    const results: TripResult[] = trips.map((trip, index) => {
      const minimumExchange = CalculatorDomain.calculateMinimumExchangeForTrip(trip);
      const formattedExchange = minimumExchange.toFixed(2);

      return {
        tripNumber: index + 1,
        minimumExchange,
        formattedExchange,
        membersCount: trip.length,
      };
    });

    return {
      results,
      totalTrips: results.length,
    };
  }
}
