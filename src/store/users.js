import firebase from '@firebase/app';
import '@firebase/auth';
import router from '@/router';


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
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');

      firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        (user) => {
          commit('setLoading', false);

          user.updateProfile({
            displayName: `${payload.firstName} ${payload.lastName}`,
          });

          // If there's merit in creating a user collection:
          // db.collection('users').doc(user.uid).set(newUserObj);

          commit('setUser', user.uid);
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
