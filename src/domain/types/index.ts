export type Expense = number;
export type TripExpenses = Expense[];
export type MultipleTripsExpenses = TripExpenses[];

export interface TripResult {
  tripNumber: number;
  minimumExchange: number;
  formattedExchange: string;
  membersCount: number;
}

export interface CalculationResult {
  results: TripResult[];
  totalTrips: number;
}
