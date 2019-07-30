import Vue       from 'vue'
import App       from './App.vue'
import SuiVue    from 'semantic-ui-vue'
import VueRouter from 'vue-router'
import routes    from './routes.js'

Vue.use(SuiVue)
Vue.use(VueRouter)

const router = new VueRouter(routes)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')