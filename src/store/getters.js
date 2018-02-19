export default {
  courses(state) {
    return state.courses.sort((courseA, courseB) => courseA.startDate > courseB.startDate);
  },
  course(state) {
    return (courseId) => {
      return state.courses.find((courseId) => {
        return course.id === courseId;
      });
    };
  },
  user(state) {
    return state.user;
  },
};
