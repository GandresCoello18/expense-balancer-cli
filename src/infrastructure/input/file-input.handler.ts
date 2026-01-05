import * as fs from 'fs/promises';

import { MultipleTripsExpenses, TripExpenses } from '../../domain/types';
import { FileReadError, FileParseError } from '../../shared/errors/app.error';
import { Validator } from '../../shared/validation/validator';

import { FileInputOptions, InputHandler } from './types';

export class FileInputHandler implements InputHandler {
  private readonly filePath: string;
  private readonly encoding: BufferEncoding;

  constructor(options: FileInputOptions) {
    this.filePath = options.filePath;
    this.encoding = options.encoding ?? 'utf-8';
  }

  public async read(): Promise<MultipleTripsExpenses> {
    try {
      const content = await fs.readFile(this.filePath, this.encoding);
      return this.parseFile(content);
    } catch (error) {
      if (error instanceof FileParseError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new FileReadError(`Error al leer el archivo: ${error.message}`, 'FILE_READ_ERROR');
      }
      throw new FileReadError('Error desconocido al leer el archivo', 'UNKNOWN_FILE_ERROR');
    }
  }

  private parseFile(input: string): MultipleTripsExpenses {
    const lines = input.trim().split('\n');
    const trips: MultipleTripsExpenses = [];
    let currentTrip: TripExpenses = [];

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine === '>') {
        if (currentTrip.length > 0) {
          trips.push(currentTrip);
          currentTrip = [];
        }
      } else if (trimmedLine.startsWith('$')) {
        try {
          const normalizedValue = Validator.normalizeMonetaryString(trimmedLine);
          const parsedValue = Validator.parseMonetaryValue(normalizedValue);
          currentTrip.push(parsedValue);
        } catch (error) {
          if (error instanceof Error) {
            throw new FileParseError(
              `Error al parsear valor en línea: "${trimmedLine}". ${error.message}`,
              'PARSE_ERROR',
            );
          }
          throw new FileParseError(
            `Error al parsear valor en línea: "${trimmedLine}"`,
            'PARSE_ERROR',
          );
        }
      }
    }

    if (currentTrip.length > 0) {
      trips.push(currentTrip);
    }

    return trips;
  }
}
