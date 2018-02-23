import firebase from '@firebase/app';
import '@firebase/firestore';

export default {
  state: {
    courses: [],
  },
  getters: {
    courses(state) {
      return state.courses.sort((courseA, courseB) => courseA.startDate > courseB.startDate);
    },
    // course(state) {
    //   return (courseId) => {
    //     return state.courses.find((courseId) => {
    //       return course.id === courseId;
    //     });
    //   };
    // },
  },
  mutations: {
    setLoadedCourses(state, payload) {
      state.courses = payload;
    },
    createCourse(state, payload) {
      state.courses.push(payload);
    },
    deleteCourse(state, payload) {
      state.courses = state.courses.filter(course => course.id !== payload);
    },
  },
  actions: {
    loadCourses({ commit }) {
      commit('setLoading', true);

      firebase.firestore().collection('courses').get()
        .then((snapshot) => {
          const courses = [];
          snapshot.forEach(doc => courses.push({
            ...doc.data(),
            id: doc.id,
          }));
          commit('setLoadedCourses', courses);
          commit('setLoading', false);
        }); // Handle errors with .catch()
    },
    createCourse({ commit, getters }, payload) {
      const course = {
        title: payload.title,
        category: payload.category,
        location: payload.location,
        startDate: payload.startDate,
        endDate: payload.endDate,
        userId: getters.user.id,
      };
      firebase.firestore().collection('courses').add(course)
        .then(
          (ref) => {
            // const key = ref.key;
            const key = ref._key.path.segments[1];
            commit('createCourse', {
              ...course,
              id: key,
            });
          },
        )
        .catch(
          // Handle Error
        );
    },
    deleteCourse({ commit }, payload) {
      firebase.firestore().collection('courses').doc(payload).delete()
        .then(
          commit('deleteCourse', payload),
        )
        .catch(
          // Handle Error
        );
    },
  },
};
