import * as express from 'express';
import ErrorHanlder from './components/error-handler';
import logger from './components/logger';
import loader from './loaders';

export async function createApplication() {
  const app = express();

  await loader(app);
  ErrorHanlder.use(app);

  return app;
}

export async function bootstrap(port: number, hostname: string) {
  const app = await createApplication();

  return app.listen(port, hostname, () => {
    logger.info(`🚀 Server ready at http://${hostname}:${port}/`);
  });
}
