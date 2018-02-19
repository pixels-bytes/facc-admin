import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    courses: [
      {
        id: 'cvxcvxcvcv',
        title: 'Making Curries Rock',
        category: 'Indian Cuisine',
        location: 'India',
        startDate: '2018-02-15',
        endDate: '2018-02-16',
      },
      {
        id: 'sdftgsgstg',
        title: 'Pizzas and Pastas',
        category: 'Italian Cuisine',
        location: 'Italy',
        startDate: '2018-02-16',
        endDate: '2018-02-17',
      },
      {
        id: 'askgstnsks',
        title: 'Paella',
        category: 'Spanish Cuisine',
        location: 'Spain',
        startDate: '2018-02-17',
        endDate: '2018-02-18',
      },
      {
        id: 'awidj0f48ae',
        title: 'Beyond Fish & Chips',
        category: 'British Cuisine',
        location: 'England',
        startDate: '2018-02-18',
        endDate: '2018-02-19',
      },
      {
        id: 'dkm09jalmcljsnrv',
        title: 'Sushi',
        category: 'Japanese Cuisine',
        location: 'Japan',
        startDate: '2018-02-15',
        endDate: '2018-02-18',
      },
    ],
    user: null,
    loading: false,
    error: null,
  },
  getters,
  actions,
  mutations,
});
