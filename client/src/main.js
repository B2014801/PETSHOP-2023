import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'jquery/dist/jquery.min.js';
import { createApp } from 'vue';
import VueTippy from 'vue-tippy';
import VueCookies from 'vue-cookies';
import { createPinia } from 'pinia';
import Vuex from 'vuex';

import './assets/main.css';
import './views/assets/main.css';
import './assets/css/global.scss';
import App from './App.vue';
import router from './router';

import gAuthPlugin from 'vue3-google-oauth2';
let gauthClientId = '487233793694-uh5ohpjahe0eo9ado0s19dmprdddmeeg.apps.googleusercontent.com';
import { gapi } from 'gapi-script';
try {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            clientId: gauthClientId,
        });
    });
} catch (error) {}
createApp(App).use(Vuex);

createApp(App).use(VueTippy, {
    defaultProps: { placement: 'bottom' },
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
});
const vm = createApp(App)
    .use(createPinia())
    .use(gAuthPlugin, {
        clientId: gauthClientId,
        scope: 'email',
        prompt: 'consent',
    })
    .use(router)
    .mount('#app');

export default vm;
