import Vue from 'vue';
import Vuetify from 'vuetify';
import VueFirestore from 'vue-firestore';
import Firebase from '@firebase/app';
import 'vuetify/dist/vuetify.min.css';

import App from './App';
import router from './router';
import { store } from './store';
import DateFilter from './filters/date';
import * as config from './config';

Vue.use(VueFirestore);
Vue.use(Vuetify, config.vuetify);

// turns off the 'You are running Vue in development mode.' msg
Vue.config.productionTip = false;

Vue.filter('date', DateFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    Firebase.initializeApp(config.firebase);
  },
});
