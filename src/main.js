'use strict';

import Vue from 'vue';
import App from './OASIS.vue';
import router from './router';
import store from './store';

import db from './utils/localstorage';
import request from './utils/request';
import './utils/install';

import VueApexCharts from 'vue-apexcharts';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(db);
Vue.use(VueApexCharts);
Vue.use(ElementUI);

Vue.component('apexchart', VueApexCharts);

Vue.use({
    install (Vue) {
        Vue.prototype.$db = db;
    }
});

Vue.prototype.$post = request.post;
Vue.prototype.$get = request.get;
Vue.prototype.$put = request.put;
Vue.prototype.$delete = request.delete;
Vue.prototype.$export = request.export;
Vue.prototype.$download = request.download;
Vue.prototype.$upload = request.upload;

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#oasis');
