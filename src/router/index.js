import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Attendance from '../views/Attendance.vue'
import Dates from '../views/Dates.vue'
import Shows from '../views/Shows.vue'
import PostShow from '../views/PostShow.vue'
import SchoolInfo from '../views/SchoolInfo.vue'
import TeacherInfo from '../views/TeacherInfo.vue'
import Review from '../views/Review.vue'
import ThankYou from '../views/ThankYou.vue'

Vue.use(VueRouter)

const routes = [
  {
    path      : '/',
    name      : 'home',
    component : Home,
    meta      : { step: 1 },
  },
  {
    path      : '/attendance',
    name      : 'attendance',
    component : Attendance,
    meta      : { step: 2 }
  },
  {
    path      : '/dates',
    name      : 'dates',
    component : Dates,
    meta      : { step: 3 }
  },
  {
    path      : '/shows',
    name      : 'shows',
    component : Shows,
    meta      : { step: 4 },
  },
  {
    path      : '/post-show',
    name      : 'post-show',
    component : PostShow,
    meta      : { step: 5 },
  },
  {
    path      : '/school-info',
    name      : 'school-info',
    component : SchoolInfo,
    meta      : { step: 6 },
  },
  {
    path      : '/teacher-info',
    name      : 'teacher-info',
    component : TeacherInfo,
    meta      : { step: 7 },
  },
  {
    path      : '/review',
    name      : 'review',
    component : Review,
    meta      : { step: 8 },
  },
  {
    path      : '/thank-you',
    name      : 'thank-you',
    component : ThankYou,
    meta      : { step: 9 },
  },
]

const router = new VueRouter({
  routes
})

export default router
