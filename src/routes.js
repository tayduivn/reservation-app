import Home       from './components/Home.vue'
import Attendance from './components/Attendance.vue'

export default {
  mode : 'history',
  routes : [
    {
      path      : '/',
      name      : 'home',
      component : Home,
      meta      : { step : 1 },
    },
    {
      path      : '/attendance',
      name      : 'attendance',
      component : Attendance,
      meta      : { step : 2 }
    }
  ]
}