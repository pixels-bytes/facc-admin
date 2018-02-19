import firebase from '@firebase/app';
import '@firebase/auth';

export default {
  createCourse({ commit }, payload) {
    const course = {
      title: payload.title,
      category: payload.category,
      location: payload.location,
      startDate: payload.startDate,
      endDate: payload.endDate,
    };
    commit('createCourse', course);
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
