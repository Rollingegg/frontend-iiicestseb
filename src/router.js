import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import HelloWorld from "./components/HelloWorld";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: HelloWorld,
            hidden:true
        }, {
            path: '/home',
            name: 'Home',
            component: Login,
            hidden:true,
            meta:{
                roles:['admin','user']
            }
        }
    ]
})