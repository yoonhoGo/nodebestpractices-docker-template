import {Application, NextFunction, Request, Response} from 'express';
import {BaseError} from './error';
import logger from './logger';

export default class ErrorHanlder {
  static use(app: Application) {
    app.use(
      async (
        err: BaseError,
        _req: Request,
        _res: Response,
        next: NextFunction
      ) => {
        const isOperationalError = await this.handleError(err);

        if (!isOperationalError) {
          next(err);
        }
      }
    );
  }
  static async handleError(err: BaseError) {
    logger.error(err);

    return err.isOperational;
  }
}
