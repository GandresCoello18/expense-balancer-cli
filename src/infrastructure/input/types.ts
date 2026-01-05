import { Interface } from 'readline';

import { MultipleTripsExpenses } from '../../domain/types';

export interface InputHandler {
  read(): Promise<MultipleTripsExpenses>;
  close?(): void;
}

export interface FileInputOptions {
  filePath: string;
  encoding?: BufferEncoding;
}

export interface ConsoleInputOptions {
  readlineInterface: Interface;
}

export type InputOptions = FileInputOptions | ConsoleInputOptions;
