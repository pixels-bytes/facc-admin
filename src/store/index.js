import Vue from 'vue';
import Vuex from 'vuex';

import courses from './courses';
import users from './users';
import shared from './shared';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    courses,
    users,
    shared,
  },
});

export default store;
