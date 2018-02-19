export default {
  createCourse(state, payload) {
    state.courses.push(payload);
  },
  setUser(state, payload) {
    state.user = payload;
  },
};
