import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { PUSH_NOTIFICATION } from '../constants/pusher';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: PUSH_NOTIFICATION.PUSHER_KEY.PUSHER_KEY,
  cluster: PUSH_NOTIFICATION.PUSHER_KEY.PUSHER_CLUSTER,
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  // Add any other configuration options as needed
});

export default echo;
