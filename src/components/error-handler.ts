import {Application, NextFunction, Request, Response} from 'express';
import {BaseError, HttpError, InternalServerError} from './error';
import logger from './logger';

export default class ErrorHanlder {
  static use(app: Application) {
    app.use(
      async (
        err: BaseError | HttpError,
        _req: Request,
        _res: Response,
        next: NextFunction
      ) => {
        const isOperationalError = await this.handleError(err);

        if (!isOperationalError) {
          const error = new InternalServerError(err.message, false);

          return next(error);
        }

        return next(err);
      },
      this.responseError
    );
  }

  static async handleError(err: BaseError) {
    logger.error(err);

    return err.isOperational;
  }

  static async responseError(
    err: BaseError | HttpError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    return res
      .status(err instanceof HttpError ? err.status : 500)
      .json({error: {name: err.name, message: err.message}});
  }
}
