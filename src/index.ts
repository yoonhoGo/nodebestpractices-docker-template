import {bootstrap} from './app';
import {PORT, HOSTNAME} from './config/environments';
import pm, {ProcessManager} from './config';

bootstrap(PORT, HOSTNAME)
  .then(server => pm.onGracefulShutdown(server))
  .catch(err => {
    console.error('Bootstrap starting error:', err);

    ProcessManager.hangUp();
  });
