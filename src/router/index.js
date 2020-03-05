'use strict';

import Vue from 'vue';
import Router from 'vue-router';

// import pages, @=src
import LoginView from '@/views/login/Common';
import HomePageView from '@/views/home/Home';

// import utils
// import db from '@/utils/localstorage';
// import request from '@/utils/request';
/*
import MenuView from '@/views/common/MenuView'
import PageView from '@/views/common/PageView'

import EmptyPageView from '@/views/common/EmptyPageView'
import HomePageView from '@/views/HomePage'
*/

// 全局Router异常处理
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => {
        if (typeof err !== 'undefined') {
            console.warn(err.stack);
        }
    });
};
Vue.use(Router);

let constRouter = [
    {
        path: '/login',
        name: '登录页',
        component: LoginView
    },
    {
        path: '/search',
        name: 'home',
        component: HomePageView
    },
    {
        path: '/index',
        name: '首页',
        redirect: '/search'
    }
];

let router = new Router({
    routes: constRouter
});

const whiteList = ['/login', '/search'];

let asyncRouter;

// 导航守卫，渲染动态路由
/**
 * @param to 目的路径
 * @param from 来源路径
 * @param next 处理函数
 */
router.beforeEach((to, from, next) => {
    // 检测白名单
    if (whiteList.indexOf(to.path) !== -1) {
        next();
        return;
    }

    // let token = get('USER_TOKEN');
    let user = get('USERNAME');
    let userRouter = get('USER_ROUTER');
    if (/* token.length && */ user) {
        if (!asyncRouter) {
            if (!userRouter) {
                let mocRouter = [{
                    path: '/',
                    name: '主页',
                    component: 'MenuView',
                    icon: 'none',
                    redirect: '/index',
                    children: [{
                        path: '/home',
                        name: '系统主页',
                        component: 'HomePageView',
                        icon: 'home',
                        meta: {closeable: false, isShow: true}
                    }, {
                        path: '/system',
                        name: '系统管理',
                        component: 'PageView',
                        icon: 'appstore-o',
                        meta: {closeable: true},
                        children: [{
                            path: '/system/user',
                            name: '用户管理',
                            component: 'system/user/User',
                            icon: '',
                            meta: {closeable: true}
                        }, {
                            path: '/system/role',
                            name: '角色管理',
                            component: 'system/role/Role',
                            icon: '',
                            meta: {closeable: true}
                        }, {
                            path: '/system/menu',
                            name: '菜单管理',
                            component: 'system/menu/Menu',
                            icon: '',
                            meta: {closeable: true}
                        }, {
                            path: '/system/dept',
                            name: '部门管理',
                            component: 'system/dept/Dept',
                            icon: '',
                            meta: {closeable: true}
                        }]
                    }, {
                        path: '/others',
                        name: '其他模块',
                        component: 'PageView',
                        icon: 'coffee',
                        meta: {closeable: true},
                        children: [{
                            path: '/others/excel',
                            name: '导入导出',
                            component: 'others/Excel',
                            meta: {closeable: true}
                        }]
                    }, {
                        path: '/profile',
                        name: '个人中心',
                        component: 'personal/Profile',
                        icon: 'none',
                        meta: {closeable: true, isShow: false}
                    }]
                }, {path: '*', name: '404', component: 'error/404'}];
                asyncRouter = mocRouter;
                save('USER_ROUTER', asyncRouter);
                go(to, next);
                /* request.get(`menu/${user.username}`).then((res) => {
                    asyncRouter = res.data;
                    save('USER_ROUTER', asyncRouter);
                    go(to, next);
                }).catch(err => {
                    console.error(err);
                }); */
            } else {
                asyncRouter = userRouter;
                console.log(userRouter);
                go(to, next);
            }
        } else {
            next();
        }
    } else {
        next('/login');
    }
});

function go (to, next) {
    asyncRouter = filterAsyncRouter(asyncRouter);
    router.addRoutes(asyncRouter);
    next({
        ...to,
        replace: true
    });
}

function get (name) {
    return JSON.parse(localStorage.getItem(name));
}

function save (name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

function filterAsyncRouter (routes) {
    return /* JSON.stringify(routes) */routes.filter((route) => {
        let component = route.component;
        if (component) {
            switch (route.component) {
                /* case 'MenuView':
                    route.component = MenuView;
                    break;
                case 'PageView':
                    route.component = PageView;
                    break;
                case 'EmptyPageView':
                    route.component = EmptyPageView;
                    break;
                case 'HomePageView':
                    route.component = HomePageView;
                    break; */
                default:
                    route.component = view(component);
            }
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children);
            }
            return true;
        }
    });
}

function view (path) {
    return function (resolve) {
        import(`@/views/${path}.vue`).then(mod => {
            resolve(mod);
        });
    };
}

export default router;
