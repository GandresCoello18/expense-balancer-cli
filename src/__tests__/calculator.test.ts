import { calculateMinimumExchange } from '../calculator';

describe('calculateMinimumExchange', () => {
  test('should calculate the correct minimum exchange for a basic case', () => {
    const trips = [[10.0, 20.0, 30.0]];
    expect(trips.map(calculateMinimumExchange)).toEqual(['$10.00']);
  });

  test('should calculate the correct exchange with fractional cents', () => {
    const trips = [[15.0, 15.01, 3.0, 3.01]];
    expect(trips.map(calculateMinimumExchange)).toEqual(['$11.99']);
  });

  test('should calculate the correct exchange with rounding differences', () => {
    const trips = [[999.1, 999.1, 999.0, 999.1]];
    expect(trips.map(calculateMinimumExchange)).toEqual(['$0.07']);
  });

  test('should calculate the correct exchange when the result is zero', () => {
    const trips = [[100.01, 99.99, 99.99]];
    expect(trips.map(calculateMinimumExchange)).toEqual(['$0.00']);
  });

  test('should calculate the correct exchange with edge cases', () => {
    const trips = [[15.0, 14.99, 3.0, 2.99]];
    expect(trips.map(calculateMinimumExchange)).toEqual(['$11.99']);
  });
});
