import {bootstrap} from './app';
import {PORT, HOSTNAME} from './config/environments';

bootstrap(PORT, HOSTNAME).catch(() => {});
