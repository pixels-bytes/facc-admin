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
    firebase
    .auth()
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(
      (user) => {
        const newUser = {
          id: user.uid,
        };
        commit('setUser', newUser);
      },
    )
    .catch(
      (error) => {
        // Handle Errors
      },
    );
  },
  signUserIn({ commit }, payload) {
    firebase
    .auth()
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(
      (user) => {
        const newUser = {
          id: user.uid,
        };
        commit('setUser', newUser);
      },
    )
    .catch(
      (error) => {
        // Handle Errors
      },
    );
  },
};
