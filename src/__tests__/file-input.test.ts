import * as fs from 'fs/promises';
import * as path from 'path';

import { FileInputHandler } from '../infrastructure/input/file-input.handler';
import { FileParseError, FileReadError } from '../shared/errors/app.error';

jest.mock('fs/promises');

describe('FileInputHandler', () => {
  const mockReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('parseFile', () => {
    it('debe parsear un solo viaje con valores monetarios válidos', async () => {
      const input = '$10\n$20\n$30';
      mockReadFile.mockResolvedValue(input);

      const handler = new FileInputHandler({ filePath: 'test.txt' });
      const result = await handler.read();

      expect(result).toEqual([[10, 20, 30]]);
    });

    it("debe separar viajes cuando encuentra '>'", async () => {
      const input = '$10\n$20\n>\n$30\n$40';
      mockReadFile.mockResolvedValue(input);

      const handler = new FileInputHandler({ filePath: 'test.txt' });
      const result = await handler.read();

      expect(result).toEqual([
        [10, 20],
        [30, 40],
      ]);
    });

    it('debe ignorar espacios en blanco al inicio y final', async () => {
      const input = '  \n$10\n$20\n>\n$30\n$40\n  ';
      mockReadFile.mockResolvedValue(input);

      const handler = new FileInputHandler({ filePath: 'test.txt' });
      const result = await handler.read();

      expect(result).toEqual([
        [10, 20],
        [30, 40],
      ]);
    });

    it('debe manejar valores con coma y punto', async () => {
      const input = '$10,50\n$20,99\n$30.50';
      mockReadFile.mockResolvedValue(input);

      const handler = new FileInputHandler({ filePath: 'test.txt' });
      const result = await handler.read();

      expect(result).toEqual([[10.5, 20.99, 30.5]]);
    });

    it('debe lanzar FileParseError para valores inválidos', async () => {
      const input = '$10\n$abc\n$30';
      mockReadFile.mockResolvedValue(input);

      const handler = new FileInputHandler({ filePath: 'test.txt' });

      await expect(handler.read()).rejects.toThrow(FileParseError);
    });

    it('debe lanzar FileReadError cuando el archivo no existe', async () => {
      mockReadFile.mockRejectedValue(new Error('ENOENT: no such file or directory'));

      const handler = new FileInputHandler({ filePath: 'nonexistent.txt' });

      await expect(handler.read()).rejects.toThrow(FileReadError);
    });

    it('debe devolver un array vacío si el input es una cadena vacía', async () => {
      mockReadFile.mockResolvedValue('');

      const handler = new FileInputHandler({ filePath: 'test.txt' });
      const result = await handler.read();

      expect(result).toEqual([]);
    });
  });
});
