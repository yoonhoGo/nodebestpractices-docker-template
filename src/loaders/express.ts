import * as helmet from 'helmet';
import * as cors from 'cors';
import * as compression from 'compression';
import * as pino from 'pino-http';
import {json} from 'express';
import {Application} from 'express';

export default function expressLoader(app: Application) {
  app.use(helmet());
  app.use(cors());
  app.use(json());
  app.use(compression());
  app.use(pino());
}
