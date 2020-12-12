export class BaseError extends Error {
  constructor(name: string, message: string, public readonly isOperational: boolean = true) {
    super(message);
    this.name = name;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this);
  }
}

export abstract class HttpError extends BaseError {
  constructor(name: string, message: string, public readonly status = 500, public readonly isOperational = true) {
    super(name, message);
  }
}

export class NotFound extends HttpError {
  status = 404;

  constructor(message: string, public readonly isOperational = true) {
    super('Not Found', message);
  }
}

export class InternalServerError extends HttpError {
  status = 500;

  constructor(message: string, public readonly isOperational = true) {
    super('Internal Server Error', message);
  }
}
