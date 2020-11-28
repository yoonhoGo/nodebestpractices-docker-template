import * as express from 'express';
import loader from './loaders';

export async function createApplication() {
  const app = express();

  await loader(app);

  return app;
}

export async function bootstrap(port: number, hostname: string) {
  const app = await createApplication();

  return app.listen(port, hostname, () => {
    console.log(`🚀 Server ready at http://${hostname}:${port}/`);
  });
}
