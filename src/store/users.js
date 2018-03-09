import firebase from '@firebase/app';
import '@firebase/auth';
import router from '@/router';
import db from '@/firebase/firebaseInit';


export default {
  state: {
    user: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    signUserUp({ commit, dispatch }, payload) {
      commit('setLoading', true);
      commit('clearError');

      firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        (user) => {
          commit('setLoading', false);

          const displayName = payload.displayName ? payload.displayName : `${payload.firstName} ${payload.lastName}`;

          const newUser = {
            id: user.uid,
            firstName: payload.firstName,
            lastName: payload.lastName,
            displayName,
            email: payload.email,
          };

          // Update Firebase and Firestore
          db
          .collection('users')
          .doc(user.uid)
          .set({
            firstName: payload.firstName,
            lastName: payload.lastName,
          });

          user
          .updateProfile({ displayName })
          .then(() => commit('setUser', newUser));
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

          const signedInUser = {
            id: user.uid,
            displayName: user.displayName,
            email: user.email,
          };

          db
          .collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            signedInUser.firstName = doc.data().firstName;
            signedInUser.lastName = doc.data().lastName;
          })
          .then(() => commit('setUser', signedInUser));
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
      commit('setUser', {
        id: payload.uid,
        firstName: payload.firstName,
        lastName: payload.lastName,
        displayName: payload.displayName,
        email: payload.email,
      });
    },
    logout({ commit }) {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null);
          router.push('/signin');
        },
      );
    },
  },
};
