import Vue from 'vue';
import Vuetify from 'vuetify';
import VueFirestore from 'vue-firestore';
import Firebase from '@firebase/app';
import 'vuetify/dist/vuetify.min.css';

import App from './App';
import router from './router';
import { store } from './store'
import DateFilter from './filters/date'


Vue.use(VueFirestore);
Vue.use(Vuetify, {
  theme: {
    primary: '#D32F2F',
    secondary: '#37474F',
    accent: '#9E9E9E',
    error: '#78909C',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});

// turns off the 'You are running Vue in development mode.' msg
Vue.config.productionTip = false;

Vue.filter('date', DateFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    Firebase.initializeApp({
      apiKey: "AIzaSyBPKRCgjyXAiE9UgacTLe7-zcxGgJKlA5Q",
      authDomain: "facc-admin.firebaseapp.com",
      databaseURL: "https://facc-admin.firebaseio.com",
      projectId: "facc-admin",
      storageBucket: "facc-admin.appspot.com",
    });
  },
});