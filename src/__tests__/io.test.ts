import { TripExpenses } from '../model/calculator.model';
import { inputMemberCount, inputMemberExpenses, parseInputFile } from '../shared/helpers/io.helper';

describe('parseInputFile', () => {
  it('debe devolver un array vacío si el input es una cadena vacía', () => {
    expect(parseInputFile({ input: '' })).toEqual([]);
  });

  it('debe parsear un solo viaje con valores monetarios válidos', () => {
    const input = '$10\n$20\n$30';
    expect(parseInputFile({ input })).toEqual([[10, 20, 30]]);
  });

  it("debe separar viajes cuando encuentra '>'", () => {
    const input = '$10\n$20\n>\n$30\n$40';
    expect(parseInputFile({ input })).toEqual([
      [10, 20],
      [30, 40],
    ]);
  });

  it('debe ignorar espacios en blanco al inicio y final', () => {
    const input = '  \n$10\n$20\n>\n$30\n$40\n  ';
    expect(parseInputFile({ input })).toEqual([
      [10, 20],
      [30, 40],
    ]);
  });

  it('debe manejar valores vacíos o inválidos correctamente', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit called');
    });

    const input = '$10\n$abc\n$30';
    expect(() => parseInputFile({ input })).toThrow('exit called');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

describe('inputMemberCount', () => {
  let mockReadline = {} as any;

  beforeEach(() => {
    mockReadline = {
      question: jest.fn(),
      close: jest.fn(),
    };
  });

  it('debe solicitar la entrada del usuario', () => {
    inputMemberCount({ readlineIntf: mockReadline });
    expect(mockReadline.question).toHaveBeenCalledWith(
      'Digite el número de miembros (0 para salir): ',
      expect.any(Function),
    );
  });

  it('debe cerrar la interfaz cuando se ingresa 0', () => {
    mockReadline.question.mockImplementation((_: any, cb: (arg0: string) => any) => cb('0'));
    inputMemberCount({ readlineIntf: mockReadline });
    expect(mockReadline.close).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

describe('inputMemberExpenses', () => {
  let mockReadline = {} as any;

  beforeEach(() => {
    mockReadline = {
      question: jest.fn(),
      close: jest.fn(),
    };
  });

  it('debe rechazar valores fuera del rango permitido y volver a preguntar', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(global, 'setTimeout').mockImplementation(cb => {
      cb();
      return {} as NodeJS.Timeout;
    });

    mockReadline.question
      .mockImplementationOnce((_: any, cb: (arg0: string) => any) => cb('2000'))
      .mockImplementationOnce((_: any, cb: (arg0: string) => any) => cb('50'));

    const mockTrips: TripExpenses = [];
    inputMemberExpenses({ numberOfMembersLine: 1, trips: mockTrips, readlineIntf: mockReadline });

    expect(mockReadline.question).toHaveBeenCalledTimes(3);
    expect(mockTrips).toEqual([[50]]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
