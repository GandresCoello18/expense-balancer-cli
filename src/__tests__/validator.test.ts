import { ValidationError } from '../shared/errors/app.error';
import { Validator } from '../shared/validation/validator';

describe('Validator', () => {
  describe('isValidMonetaryValue', () => {
    it('debe retornar true para valores monetarios válidos', () => {
      expect(Validator.isValidMonetaryValue('10.50')).toBe(true);
      expect(Validator.isValidMonetaryValue('0')).toBe(true);
      expect(Validator.isValidMonetaryValue('1000')).toBe(true);
      expect(Validator.isValidMonetaryValue('10')).toBe(true);
      expect(Validator.isValidMonetaryValue('99.99')).toBe(true);
    });

    it('debe retornar false para valores no numéricos', () => {
      expect(Validator.isValidMonetaryValue('abc')).toBe(false);
      expect(Validator.isValidMonetaryValue('10.5a')).toBe(false);
      expect(Validator.isValidMonetaryValue('$')).toBe(false);
    });

    it('debe retornar false para valores NaN', () => {
      expect(Validator.isValidMonetaryValue('NaN')).toBe(false);
      expect(Validator.isValidMonetaryValue('undefined')).toBe(false);
      expect(Validator.isValidMonetaryValue('null')).toBe(false);
    });
  });

  describe('parseMonetaryValue', () => {
    it('debe parsear valores válidos correctamente', () => {
      expect(Validator.parseMonetaryValue('10.50')).toBe(10.5);
      expect(Validator.parseMonetaryValue('0')).toBe(0);
      expect(Validator.parseMonetaryValue('1000')).toBe(1000);
    });

    it('debe lanzar ValidationError para valores inválidos', () => {
      expect(() => Validator.parseMonetaryValue('abc')).toThrow(ValidationError);
      expect(() => Validator.parseMonetaryValue('10.5a')).toThrow(ValidationError);
    });
  });

  describe('normalizeMonetaryString', () => {
    it('debe normalizar valores con $ y coma', () => {
      expect(Validator.normalizeMonetaryString('$10,50')).toBe('10.50');
      expect(Validator.normalizeMonetaryString('$100')).toBe('100');
      expect(Validator.normalizeMonetaryString('  $10,50  ')).toBe('10.50');
    });
  });

  describe('validateMembersCount', () => {
    it('debe validar números enteros positivos', () => {
      expect(() => Validator.validateMembersCount(1)).not.toThrow();
      expect(() => Validator.validateMembersCount(100)).not.toThrow();
      expect(() => Validator.validateMembersCount(0)).not.toThrow();
    });

    it('debe lanzar ValidationError para números negativos', () => {
      expect(() => Validator.validateMembersCount(-1)).toThrow(ValidationError);
    });

    it('debe lanzar ValidationError para números decimales', () => {
      expect(() => Validator.validateMembersCount(1.5)).toThrow(ValidationError);
    });
  });
});
