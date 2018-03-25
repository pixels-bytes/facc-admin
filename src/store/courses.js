import db from '@/firebase/firebaseInit';

export default {
  state: {
    courses: [],
  },
  getters: {
    courses(state) {
      return state.courses.sort((courseA, courseB) => courseA.startDate > courseB.startDate);
    },
    course(state) {
      return id => state.courses.find(obj => obj.id === id);
    },
  },
  mutations: {
    setLoadedCourses(state, payload) {
      state.courses = payload;
    },
    createCourse(state, payload) {
      state.courses.push(payload);
    },
    updateCourse(state, payload) {
      state.courses.filter(course => course.id === payload.id)[0] = payload;
    },
    deleteCourse(state, payload) {
      state.courses = state.courses.filter(course => course.id !== payload);
    },
  },
  actions: {
    loadCourses({ commit }) {
      commit('setLoading', true);

      db
      .collection('courses').get()
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
      db
      .collection('courses').add(course)
      .then(
        (ref) => {
          const key = ref.id;
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
    updateCourse({ commit, getters }, payload) {
      const fetchedCourse = getters.course(payload.id);
      const updatedCourse = { ...fetchedCourse, ...payload };

      db
      .collection('courses')
      .doc(payload.id)
      .set(updatedCourse)
      .then(commit('updateCourse', updatedCourse));
    },
    deleteCourse({ commit }, payload) {
      db
      .collection('courses')
      .doc(payload)
      .delete()
      .then(commit('deleteCourse', payload))
      .catch(
        // Handle Error
      );
    },
  },
};
