import {
  CENTS_IN_DOLLAR,
  MAX_MEMBERS_ALLOWED_BY_TRIP,
  MAX_VALUE_ALLOWED_BY_MEMBER,
} from '../../shared/constants';
import { ValidationError } from '../../shared/errors/app.error';
import { Expense, TripExpenses } from '../types';

export class CalculatorDomain {
  private static convertToCents(amount: number): number {
    return Math.round(amount * CENTS_IN_DOLLAR);
  }

  private static calculateAverage(total: number, count: number): number {
    return Math.floor(total / count);
  }

  public static validateTripMembersCount(count: number): void {
    if (count > MAX_MEMBERS_ALLOWED_BY_TRIP) {
      throw new ValidationError(
        `El número máximo de miembros por viaje es de ${MAX_MEMBERS_ALLOWED_BY_TRIP}. Se encontró que un viaje contiene ${count} miembros`,
        'MAX_MEMBERS_EXCEEDED',
      );
    }
  }

  public static validateExpenseRange(expense: Expense): void {
    if (expense < 0 || expense > MAX_VALUE_ALLOWED_BY_MEMBER) {
      throw new ValidationError(
        `Se encontraron gastos fuera del rango permitido (min $0 y máximo $${MAX_VALUE_ALLOWED_BY_MEMBER}). Error -> ${expense}`,
        'INVALID_EXPENSE_RANGE',
      );
    }
  }

  public static validateTripExpenses(trip: TripExpenses): void {
    this.validateTripMembersCount(trip.length);
    trip.forEach(expense => this.validateExpenseRange(expense));
  }

  public static calculateMinimumExchangeForTrip(trip: TripExpenses): number {
    this.validateTripExpenses(trip);

    const expenses = trip.map(expense => this.convertToCents(expense));
    const total = expenses.reduce((acc, exp) => acc + exp, 0);
    const average = this.calculateAverage(total, expenses.length);

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
    return exchange / CENTS_IN_DOLLAR;
  }
}
