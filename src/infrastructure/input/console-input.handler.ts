import * as readline from 'readline';

import { log } from 'console-log-colors';

import { CalculatorDomain } from '../../domain/calculator/calculator.domain';
import { MultipleTripsExpenses, TripExpenses } from '../../domain/types';
import { END_PROCESS } from '../../shared/constants';
import { ValidationError } from '../../shared/errors/app.error';
import { Validator } from '../../shared/validation/validator';

import { ConsoleInputOptions, InputHandler } from './types';

export function createReadlineInterface(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

export class ConsoleInputHandler implements InputHandler {
  private readonly readlineInterface: readline.Interface;
  private trips: MultipleTripsExpenses = [];

  constructor(options: ConsoleInputOptions) {
    this.readlineInterface = options.readlineInterface;
  }

  public async read(): Promise<MultipleTripsExpenses> {
    return new Promise((resolve, reject) => {
      this.trips = [];
      this.inputMemberCount(resolve, reject);
    });
  }

  public close(): void {
    this.readlineInterface.close();
  }

  private inputMemberCount(
    resolve: (value: MultipleTripsExpenses) => void,
    reject: (error: Error) => void,
  ): void {
    this.readlineInterface.question('Digite el número de miembros (0 para salir): ', input => {
      try {
        const trimmedInput = input.trim();
        const memberCount = parseFloat(trimmedInput);

        if (!Validator.isValidMonetaryValue(trimmedInput)) {
          log.red(`⚠️  Entrada no válida. Ingresa un número. ⚠️   ->  ${trimmedInput}`);
          this.inputMemberCount(resolve, reject);
          return;
        }

        if (memberCount === END_PROCESS) {
          this.readlineInterface.close();
          resolve(this.trips);
          return;
        }

        try {
          Validator.validateMembersCount(memberCount);
          CalculatorDomain.validateTripMembersCount(memberCount);
        } catch (error) {
          if (error instanceof ValidationError) {
            log.red(`⚠️  ${error.message}`);
            this.inputMemberCount(resolve, reject);
            return;
          }
          reject(error instanceof Error ? error : new Error('Error desconocido'));
          return;
        }

        this.inputMemberExpenses(memberCount, resolve, reject);
      } catch (error) {
        reject(error instanceof Error ? error : new Error('Error desconocido'));
      }
    });
  }

  private inputMemberExpenses(
    numberOfMembers: number,
    resolve: (value: MultipleTripsExpenses) => void,
    reject: (error: Error) => void,
  ): void {
    const expenses: TripExpenses = [];
    const inputNextExpense = (): void => {
      if (expenses.length === numberOfMembers) {
        this.trips.push(expenses);
        log.gray(`✅ Viaje registrado: ${expenses.join(',')}`);
        this.inputMemberCount(resolve, reject);
        return;
      }

      this.readlineInterface.question(`Gasto para el miembro #${expenses.length + 1}: `, input => {
        try {
          const normalizedValue = Validator.normalizeMonetaryString(input);
          const parsedValue = Validator.parseMonetaryValue(normalizedValue);

          try {
            CalculatorDomain.validateExpenseRange(parsedValue);
          } catch (error) {
            if (error instanceof ValidationError) {
              log.red('❌ El valor debe estar entre $0.00 y $1000.00');
              inputNextExpense();
              return;
            }
            reject(error instanceof Error ? error : new Error('Error desconocido'));
            return;
          }

          expenses.push(parsedValue);
          inputNextExpense();
        } catch (error) {
          if (error instanceof ValidationError) {
            log.red('❌ El valor debe estar entre $0.00 y $1000.00');
            inputNextExpense();
            return;
          }
          reject(error instanceof Error ? error : new Error('Error desconocido'));
        }
      });
    };

    inputNextExpense();
  }
}
