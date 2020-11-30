export class BaseError extends Error {
  constructor(message: string, public readonly isOperational: boolean = true) {
    super(message);
  }
}
