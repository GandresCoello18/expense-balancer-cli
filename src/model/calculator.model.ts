import { Interface } from 'readline';

export type TripExpenses = number[][];
export type ReadlineIntf = Interface;

export type CalculatorModel = {
  trips: TripExpenses;
  trip: number[];
  readlineIntf: ReadlineIntf;
  numberOfMembersLine: number;
  expenses: number[];
};
