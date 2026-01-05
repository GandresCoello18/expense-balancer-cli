import { CalculatorDomain } from '../domain/calculator/calculator.domain';

describe('CalculatorDomain', () => {
  describe('calculateMinimumExchangeForTrip', () => {
    test('Debería calcular el intercambio mínimo correcto para un caso básico', () => {
      const trip = [10.0, 20.0, 30.0];
      const result = CalculatorDomain.calculateMinimumExchangeForTrip(trip);
      expect(result).toBeCloseTo(10.0, 2);
    });

    test('Debería calcular el cambio correcto con fracciones de centavos', () => {
      const trip = [15.0, 15.01, 3.0, 3.01];
      const result = CalculatorDomain.calculateMinimumExchangeForTrip(trip);
      expect(result).toBeCloseTo(11.99, 2);
    });

    test('Debería calcular el cambio correcto con las diferencias de redondeo', () => {
      const trip = [999.1, 999.1, 999.0, 999.1];
      const result = CalculatorDomain.calculateMinimumExchangeForTrip(trip);
      expect(result).toBeCloseTo(0.07, 2);
    });

    test('Debería calcular el cambio correcto cuando el resultado sea cero', () => {
      const trip = [100.01, 99.99, 99.99];
      const result = CalculatorDomain.calculateMinimumExchangeForTrip(trip);
      expect(result).toBeCloseTo(0.0, 2);
    });

    test('Debería calcular el intercambio correcto con casos extremos', () => {
      const trip = [15.0, 14.99, 3.0, 2.99];
      const result = CalculatorDomain.calculateMinimumExchangeForTrip(trip);
      expect(result).toBeCloseTo(11.99, 2);
    });

    test('debe calcular el intercambio mínimo para un viaje grande', () => {
      const trip = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
      const result = CalculatorDomain.calculateMinimumExchangeForTrip(trip);
      expect(result).toBeCloseTo(1250.0, 2);
    });

    test('debe manejar un viaje con valores desiguales en un grupo grande', () => {
      const trip = [50, 150, 250, 350, 450, 550, 650, 750, 850, 950];
      const result = CalculatorDomain.calculateMinimumExchangeForTrip(trip);
      expect(result).toBeCloseTo(1250.0, 2);
    });

    describe('validateTripMembersCount', () => {
      test('debe lanzar error si el número de miembros excede el máximo', () => {
        const trip = new Array(101).fill(10);
        expect(() => CalculatorDomain.calculateMinimumExchangeForTrip(trip)).toThrow();
      });

      test('no debe lanzar error si el número de miembros es válido', () => {
        const trip = new Array(100).fill(10);
        expect(() => CalculatorDomain.calculateMinimumExchangeForTrip(trip)).not.toThrow();
      });
    });

    describe('validateExpenseRange', () => {
      test('debe lanzar error si el gasto excede el máximo', () => {
        const trip = [1001];
        expect(() => CalculatorDomain.calculateMinimumExchangeForTrip(trip)).toThrow();
      });

      test('debe lanzar error si el gasto es negativo', () => {
        const trip = [-1];
        expect(() => CalculatorDomain.calculateMinimumExchangeForTrip(trip)).toThrow();
      });

      test('no debe lanzar error si el gasto está en el rango válido', () => {
        const trip = [1000];
        expect(() => CalculatorDomain.calculateMinimumExchangeForTrip(trip)).not.toThrow();
      });
    });
  });
});
