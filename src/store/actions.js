import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';


export default {  
  createCourse({ commit }, payload) {
    const course = {
      title: payload.title,
      category: payload.category,
      location: payload.location,
      startDate: payload.startDate,
      endDate: payload.endDate,
    };
    firebase.firestore().collection('courses').add(course)
      .then(
        commit('createCourse', course)
      )
      .catch(
        (error) => console.log(error)
      );
  },
  signUserUp({ commit }, payload) {
    commit('setLoading', true);
    commit('clearError');

    firebase
    .auth()
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(
      (user) => {
        commit('setLoading', false);
        const newUser = {
          id: user.uid,
        };
        commit('setUser', newUser);
      },
    )
    .catch(
      (error) => {
        commit('setLoading', false);
        commit('setError', error);
        // Handle Errors
      },
    );
  },
  signUserIn({ commit }, payload) {
    commit('setLoading', true);
    commit('clearError');

    firebase
    .auth()
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(
      (user) => {
        commit('setLoading', false);
        const newUser = {
          id: user.uid,
        };
        commit('setUser', newUser);
      },
    )
    .catch(
      (error) => {
        commit('setLoading', false);
        commit('setError', error);
        // Handle Errors
      },
    );
  },
  clearError({ commit }) {
    commit('clearError');
  },
};
