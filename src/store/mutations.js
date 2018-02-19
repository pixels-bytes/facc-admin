export default {
  setLoadedCourses(state, payload) {
    state.courses = payload;
  },
  createCourse(state, payload) {
    state.courses.push(payload);
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  },
};
