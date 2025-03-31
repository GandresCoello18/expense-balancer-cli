import { calculateMinimumExchange } from '../services/calculator.service';

describe('calculateMinimumExchange', () => {
  test('Debería calcular el intercambio mínimo correcto para un caso básico', () => {
    const trips = [[10.0, 20.0, 30.0]];
    expect(calculateMinimumExchange({ trips })).toEqual(['10.00']);
  });

  test('Debería calcular el cambio correcto con fracciones de centavos', () => {
    const trips = [[15.0, 15.01, 3.0, 3.01]];
    expect(calculateMinimumExchange({ trips })).toEqual(['11.99']);
  });

  test('Debería calcular el cambio correcto con las diferencias de redondeo', () => {
    const trips = [[999.1, 999.1, 999.0, 999.1]];
    expect(calculateMinimumExchange({ trips })).toEqual(['0.07']);
  });

  test('Debería calcular el cambio correcto cuando el resultado sea cero', () => {
    const trips = [[100.01, 99.99, 99.99]];
    expect(calculateMinimumExchange({ trips })).toEqual(['0.00']);
  });

  test('Debería calcular el intercambio correcto con casos extremos', () => {
    const trips = [[15.0, 14.99, 3.0, 2.99]];
    expect(calculateMinimumExchange({ trips })).toEqual(['11.99']);
  });

  it("debe calcular el intercambio mínimo para un viaje grande", () => {
    const trips = [[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]];
    expect(calculateMinimumExchange({ trips })).toEqual(["1250.00"]);
  });

  it("debe manejar un viaje con valores desiguales en un grupo grande", () => {
    const trips = [[50, 150, 250, 350, 450, 550, 650, 750, 850, 950]];
    expect(calculateMinimumExchange({ trips })).toEqual(["1250.00"]);
  });
});
