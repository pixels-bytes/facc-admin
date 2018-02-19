import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    courses: [],
    user: null,
    loading: false,
    error: null,
  },
  getters,
  actions,
  mutations,
});
