export abstract class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, code: string, statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, code: string = 'VALIDATION_ERROR') {
    super(message, code, 400);
  }
}

export class FileParseError extends AppError {
  constructor(message: string, code: string = 'FILE_PARSE_ERROR') {
    super(message, code, 400);
  }
}

export class FileReadError extends AppError {
  constructor(message: string, code: string = 'FILE_READ_ERROR') {
    super(message, code, 400);
  }
}

export class ConfigurationError extends AppError {
  constructor(message: string, code: string = 'CONFIGURATION_ERROR') {
    super(message, code, 500);
  }
}
