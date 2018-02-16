import Vue from 'vue';
import App from './App';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  theme: {
    primary: '#D32F2F',
    secondary: '#37474F',
    accent: '#9E9E9E',
    error: '#78909C',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
