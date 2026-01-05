import { CalculateExpensesUseCase } from '../application/use-cases/calculate-expenses.use-case';

describe('CalculateExpensesUseCase', () => {
  let useCase: CalculateExpensesUseCase;

  beforeEach(() => {
    useCase = new CalculateExpensesUseCase();
  });

  it('debe calcular correctamente los resultados para múltiples viajes', () => {
    const trips = [
      [10.0, 20.0, 30.0],
      [15.0, 15.01, 3.0, 3.01],
    ];

    const result = useCase.execute(trips);

    expect(result.totalTrips).toBe(2);
    expect(result.results).toHaveLength(2);
    expect(result.results[0].tripNumber).toBe(1);
    expect(result.results[0].minimumExchange).toBeCloseTo(10.0, 2);
    expect(result.results[0].formattedExchange).toBe('10.00');
    expect(result.results[0].membersCount).toBe(3);

    expect(result.results[1].tripNumber).toBe(2);
    expect(result.results[1].minimumExchange).toBeCloseTo(11.99, 2);
    expect(result.results[1].formattedExchange).toBe('11.99');
    expect(result.results[1].membersCount).toBe(4);
  });

  it('debe manejar un array vacío de viajes', () => {
    const trips: number[][] = [];

    const result = useCase.execute(trips);

    expect(result.totalTrips).toBe(0);
    expect(result.results).toHaveLength(0);
  });

  it('debe formatear correctamente los valores con dos decimales', () => {
    const trips = [[999.1, 999.1, 999.0, 999.1]];

    const result = useCase.execute(trips);

    expect(result.results[0].formattedExchange).toBe('0.07');
  });
});
