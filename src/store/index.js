import Vue from 'vue';
import Vuex from 'vuex';

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
        user: {
          id: 'sdsdfsdfsgeg'
        }
    },
    mutations: {
      createCourse (state, payload) {
        state.courses.push(payload);
      }
    },
    actions: {
      createCourse ({ commit }, payload) {
        const course = {
          title: payload.title,
          category: payload.category,
          location: payload.location,
          startDate: payload.startDate,
          endDate: payload.endDate,
        }
        commit('createCourse', course);
      }
    },
    getters: {
      courses (state) {
        return state.courses.sort((courseA, courseB) => {
          return courseA.startDate > courseB.startDate;
        });
      },
      course (state) {
        return (courseId) => {
          return state.courses.find((courseId) => {
            return course.id === courseId;
          });
        };
      }
    }
});