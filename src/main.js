'use strict';

import Vue from 'vue';
import App from './OASIS.vue';
import router from './router';
import store from './store';

import db from './utils/localstorage';
import request from './utils/request';
import userfulFunctions from './utils/usefulFunction';
import './utils/install';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(db);
Vue.use(ElementUI);

Vue.use({
    install (Vue) {
        Vue.prototype.$db = db;
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
Vue.prototype.$isEmpty = userfulFunctions.isEmpty;

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#oasis');
