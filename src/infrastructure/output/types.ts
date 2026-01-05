import { CalculationResult } from '../../domain/types';

export interface OutputFormatter {
  format(result: CalculationResult): string;
}

export interface OutputHandler {
  write(data: string): void | Promise<void>;
}
