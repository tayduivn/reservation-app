import Home       from './components/Home.vue'
import Attendance from './components/Attendance.vue'
import Dates       from './components/Dates.vue'

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
  ]
}