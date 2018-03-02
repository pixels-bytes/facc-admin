/**
 * FIND A COOKERY COURSE ADMIN
 * @version 1.0.0
 * @author Pixels & Bytes
 * @description Handles the content and user management for the FACC website
 *
 * @requires firebase
 * @requires vue-firestore
 */


// THE IMPORTS
import Vue from 'vue';

// App
import App from '@/App';
import router from '@/router';
import store from '@/store';

// Firebase
import Firebase from '@firebase/app';
import VueFirestore from 'vue-firestore';
import '@firebase/auth';
import '@/firebase/firebaseInit';

// Vuetify
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import theme from '@/config/theme';

// Filters
import DateFilter from '@/filters/date';

/* Components */
import AlertCmp from '@/components/Shared/Alert';
import InfoCmp from '@/components/Shared/Info';
import UploadButton from '@/components/Shared/UploadButton';
import CourseDialog from '@/components/Course/CourseDialog';


/* Add Components */
Vue.component('app-alert', AlertCmp);
Vue.component('app-info', InfoCmp);
Vue.component('upload-button', UploadButton);
Vue.component('course-dialog', CourseDialog);

/* Wireup Middleware */
Vue.use(VueFirestore);
Vue.use(Vuetify, theme);
Vue.filter('date', DateFilter);

Vue.config.productionTip = false; // no dev mode message


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
