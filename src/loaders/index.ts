import {Application} from 'express';
import expressLoader from './express';

export default async function loader(app: Application) {
  expressLoader(app);

  return app;
}
