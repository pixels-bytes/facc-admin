import Vue from 'vue';
import Router from 'vue-router';
import Courses from '@/components/Course/Courses';
import CreateCourse from '@/components/Course/CreateCourse';
import Profile from '@/components/User/Profile';
import Signup from '@/components/User/Signup';
import Signin from '@/components/User/Signin';
import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/courses',
    },
    {
      path: '/courses',
      name: 'Courses',
      component: Courses,
    },
    {
      path: '/courses/new',
      name: 'CreateCourse',
      component: CreateCourse,
      beforeEnter: AuthGuard,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
  ],
  mode: 'history',
});
