import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)
// import Infor from './components/Info.vue'

Vue.config.productionTip = false

new Vue({
  router,
  // Infor,
  render: h => h(App)
}).$mount('#app')