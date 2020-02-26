import Vue from 'vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import router from './router.js'
import App from './App.vue'

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
    router,
}).$mount('#app')
