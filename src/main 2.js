import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n'; // Import the i18n instance

import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);

app.use(i18n);
console.log("i18n messages loaded:", i18n.global.messages.value);

app.mount('#app');