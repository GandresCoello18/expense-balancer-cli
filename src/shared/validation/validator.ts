import { MONETARY_VALUE_REGEX } from '../constants';
import { ValidationError } from '../errors/app.error';

export class Validator {
  public static isValidMonetaryValue(value: string): boolean {
    if (!MONETARY_VALUE_REGEX.test(value)) {
      return false;
    }
    const parsed = parseFloat(value);
    return !isNaN(parsed) && isFinite(parsed);
  }

  public static validateMonetaryValue(value: string): void {
    if (!this.isValidMonetaryValue(value)) {
      throw new ValidationError(`Valor monetario inválido: ${value}`, 'INVALID_MONETARY_VALUE');
    }
  }

  public static parseMonetaryValue(value: string): number {
    this.validateMonetaryValue(value);
    return parseFloat(value);
  }

  public static normalizeMonetaryString(value: string): string {
    return value.replace('$', '').replace(',', '.').trim();
  }

  public static validateMembersCount(count: number): void {
    if (!Number.isInteger(count) || count < 0) {
      throw new ValidationError(
        `El número de miembros debe ser un entero positivo. Se recibió: ${count}`,
        'INVALID_MEMBERS_COUNT',
      );
    }
  }
}
