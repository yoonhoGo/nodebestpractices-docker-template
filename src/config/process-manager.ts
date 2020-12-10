import {Server} from 'http';
import {BaseError} from '../components/error';
import logger from '../components/logger';

export class ProcessManager {
  constructor(private server?: Server) {
    this.unhandledRejection();
    this.uncaughtException();
  }

  static exit() {
    process.exit(0);
  }

  static hangUp() {
    process.exit(1);
  }

  static async shutdown(server: Server) {
    logger.info('Received kill signal, shutting down gracefully');

    if (server) {
      server.close(() => {
        logger.info('Closed out remaining connections');

        ProcessManager.exit();
      });

      return;
    }

    setTimeout(() => {
      logger.error(
        'Could not close connections in time, forcefully shutting down'
      );

      ProcessManager.hangUp();
    }, 10000);
  }

  unhandledRejection() {
    process.on('unhandledRejection', reason => {
      throw reason;
    });
  }

  uncaughtException() {
    process.on('uncaughtException', (error: BaseError) => {
      logger.error('UncaughtExepcion ', error);

      if ('isOperational' in error && error.isOperational) {
        return;
      }

      if (this.server) {
        ProcessManager.shutdown(this.server);
      } else {
        process.exit(1);
      }
    });
  }

  onGracefulShutdown(server: Server) {
    this.server = server;
    process.on('SIGTERM', () => ProcessManager.shutdown(server));
    process.on('SIGINT', () => ProcessManager.shutdown(server));
  }
}

export default new ProcessManager();
