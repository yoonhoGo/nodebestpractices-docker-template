import {bootstrap} from './app';
import {PORT, HOSTNAME} from './config';
import pm, {ProcessManager} from './config/process-manager';
import logger from './components/logger';

bootstrap(PORT, HOSTNAME)
  .then(server => pm.onGracefulShutdown(server))
  .catch(err => {
    logger.error('Bootstrap starting error:', err);

    ProcessManager.hangUp();
  });
