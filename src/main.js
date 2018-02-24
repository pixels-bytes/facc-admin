import Vue from 'vue';
import Vuetify from 'vuetify';
import VueFirestore from 'vue-firestore';
import Firebase from '@firebase/app';
import '@firebase/auth';
import 'vuetify/dist/vuetify.min.css';

import App from './App';
import router from './router';
import store from './store';
import DateFilter from './filters/date';
import AlertCmp from './components/Shared/Alert';
import theme from './config/theme';
import './firebase/firebaseInit';

Vue.use(VueFirestore);
Vue.use(Vuetify, theme);

// turns off the 'You are running Vue in development mode.' msg
Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertCmp);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });
    this.$store.dispatch('loadCourses');
  },
});
