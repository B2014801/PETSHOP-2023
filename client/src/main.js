import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'jquery/dist/jquery.min.js';
import { createApp } from 'vue';
import VueTippy from 'vue-tippy';

import './assets/main.css';
import './assets/css/global.scss';
import App from './App.vue';
import router from './router';
createApp(App).use(VueTippy, {
    defaultProps: { placement: 'bottom' },
});
createApp(App).use(router).mount('#app');
