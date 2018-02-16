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
              date: '2018-02-15'
            },
            { 
              id: 'sdftgsgstg',
              title: 'Pizzas and Pastas',
              category: 'Italian Cuisine',
              location: 'Italy',
              date: '2018-02-16'
            },
            { 
              id: 'askgstnsks',
              title: 'Paella',
              category: 'Spanish Cuisine',
              location: 'Spain',
              date: '2018-02-17'
            },
            { 
              id: 'awidj0f48ae',
              title: 'Beyond Fish & Chips',
              category: 'British Cuisine',
              location: 'England',
              date: '2018-02-18'
            },
            { 
              id: 'dkm09jalmcljsnrv',
              title: 'Sushi',
              category: 'Japanese Cuisine',
              location: 'Japan',
              date: '2018-02-15'
            }
        ],
        user: {
          id: 'sdsdfsdfsgeg'
        }
    },
    mutations: {},
    actions: {},
    getters: {
      courses (state) {
        return state.courses.sort((courseA, courseB) => {
          return courseA.date > courseB.date;
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