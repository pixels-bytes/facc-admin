import Vue from 'vue';


/* Firebase */
import Firebase from '@firebase/app';
import VueFirestore from 'vue-firestore';
import '@firebase/auth';

/* Vuetify */
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

/* App */
import App from './App';
import router from './router';
import store from './store';

/* Shared */
import DateFilter from './filters/date';
import AlertCmp from './components/Shared/Alert';

/* Config */
import './firebase/firebaseInit';
import theme from './config/theme';

/* Wireup Middleware */
Vue.use(VueFirestore);
Vue.use(Vuetify, theme);
Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertCmp);

// turns off the 'You are running Vue in development mode.' msg
Vue.config.productionTip = false;


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
