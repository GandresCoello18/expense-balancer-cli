import { MAx_VALUE_ALLOWED_BY_MEMBER } from '../shared/utils/calculator.util';
import { isValidMonetaryValue, isValidRangeValueAllowed } from '../shared/utils/validate.util';

describe('isValidMonetaryValue', () => {
  it('debe retornar true para valores monetarios válidos', () => {
    expect(isValidMonetaryValue('10.50')).toBe(true);
    expect(isValidMonetaryValue('0')).toBe(true);
    expect(isValidMonetaryValue('1000')).toBe(true);
  });

  it('debe retornar false para valores no numéricos', () => {
    expect(isValidMonetaryValue('abc')).toBe(false);
    expect(isValidMonetaryValue('10.5a')).toBe(false);
    expect(isValidMonetaryValue('$')).toBe(false);
  });

  it('debe retornar false para valores NaN', () => {
    expect(isValidMonetaryValue('NaN')).toBe(false);
    expect(isValidMonetaryValue('undefined')).toBe(false);
    expect(isValidMonetaryValue('null')).toBe(false);
  });
});

describe('isValidRangeValueAllowed', () => {
  it('debe retornar true para valores dentro del rango permitido', () => {
    expect(isValidRangeValueAllowed({ value: 0 })).toBe(true);
    expect(isValidRangeValueAllowed({ value: 500 })).toBe(true);
    expect(isValidRangeValueAllowed({ value: MAx_VALUE_ALLOWED_BY_MEMBER })).toBe(true);
  });

  it('debe retornar false para valores fuera del rango permitido', () => {
    expect(isValidRangeValueAllowed({ value: -1 })).toBe(false);
    expect(isValidRangeValueAllowed({ value: MAx_VALUE_ALLOWED_BY_MEMBER + 1 })).toBe(false);
  });

  it('debe manejar valores límite correctamente', () => {
    expect(isValidRangeValueAllowed({ value: 0 })).toBe(true);
    expect(isValidRangeValueAllowed({ value: MAx_VALUE_ALLOWED_BY_MEMBER })).toBe(true);
  });
});
