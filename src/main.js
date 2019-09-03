import Vue       from 'vue'
import VueRouter from 'vue-router'
import Vuex      from 'vuex'
import SuiVue    from 'semantic-ui-vue'
import App       from './App'
import routes    from './routes'
import modules   from './modules'
import Notifications from 'vue-notification'
import VueTheMask from 'vue-the-mask'

Vue.use(SuiVue)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Notifications)
Vue.use(VueTheMask)

const router = new VueRouter(routes)
const store  = new Vuex.Store(modules)

try {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
} catch (error) {
  console.log(error)
}
