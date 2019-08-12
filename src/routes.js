import Home        from './components/Home.vue'
import Attendance  from './components/Attendance.vue'
import Dates       from './components/Dates.vue'
import Shows       from './components/Shows.vue'
import PostShow    from './components/PostShow.vue'
import SchoolInfo  from './components/SchoolInfo.vue'
import TeacherInfo from './components/TeacherInfo.vue'
import Review      from './components/Review.vue'
import ThankYou    from './components/ThankYou.vue'

export default {
  mode : 'history',
  routes : [
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
}