import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';


export default {
  loadCourses({ commit }) {
    commit('setLoading', true);

    firebase.firestore().collection('courses').get()
      .then((snapshot) => {
        const courses = [];
        snapshot.forEach(doc => courses.push({
          ...doc.data(),
          id: doc.id
        }));
        commit('setLoadedCourses', courses);
        commit('setLoading', false);
      })
      .catch((error) => {
        console.log(error);
        commit('setLoading', false);
      });
  },
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
        (data) => {
          const key = data.key;
          commit('createCourse', {
            ...course,
            id: key,
          });
        },
      )
      .catch(
        error => console.log(error),
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
  autoSignIn({ commit }, payload) {
    commit('setUser', { id: payload.uid });
  },
  clearError({ commit }) {
    commit('clearError');
  },
};
