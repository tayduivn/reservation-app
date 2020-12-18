import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SuiVue from 'semantic-ui-vue'
import Notifications from 'vue-notification'
import VueTheMask from 'vue-the-mask'

Vue.use(SuiVue)
Vue.use(Notifications)
Vue.use(VueTheMask)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
