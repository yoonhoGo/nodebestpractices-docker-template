import {Server} from 'http';
import {BaseError} from '../components/error';

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
    console.info('Received kill signal, shutting down gracefully');

    server.close(() => {
      console.info('Closed out remaining connections');

      ProcessManager.exit();
    });

    setTimeout(() => {
      console.error(
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
      console.error('UncaughtExepcion ', error);

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
