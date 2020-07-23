'use strict';

import Vue from 'vue';
import App from './OASIS.vue';
import router from './router';
import store from './store';

import db from './utils/localstorage';
import request from './utils/request';
import usefulFunctions from './utils/usefulFunction';
import './utils/install';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'font-awesome/css/font-awesome.css'

import echarts from 'echarts';
import moment from 'moment';

process.env.Mock && require('./mock.js')

Vue.config.productionTip = false;
Vue.use(db);
Vue.use(ElementUI);

Vue.use({
    install (Vue) {
        Vue.prototype.$db = db;
        Vue.prototype.$echarts = echarts;
    }
});

Vue.prototype.$post = request.post;
Vue.prototype.$postJson = request.postJson;
Vue.prototype.$get = request.get;
Vue.prototype.$put = request.put;
Vue.prototype.$delete = request.delete;
Vue.prototype.$export = request.export;
Vue.prototype.$download = request.download;
Vue.prototype.$upload = request.upload;
Vue.prototype.$isEmpty = usefulFunctions.isEmpty;
Vue.prototype.$debounce = usefulFunctions.fnDebounce;
Vue.prototype.$throttle = usefulFunctions.fnThrottle;
Vue.prototype.$moment = moment;

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#oasis');
