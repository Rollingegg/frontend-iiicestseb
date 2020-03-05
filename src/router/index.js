'use strict';

import Vue from 'vue';
import Router from 'vue-router';

// import pages, @=src
import LoginView from '@/views/login/Common';
import HomePageView from '@/views/home/Home';
import SearchPageView from '@/views/search/ResultPage';
// import ResLiter from '@/components/ResLiter';
// import LiteratureCard from '@/components/LiteratureCard';

// import utils
import db from '@/utils/localstorage';
import request from '@/utils/request';
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
        // children: [
        //     {
        //         path: '/test/1',
        //         component: ResLiter
        //     },
        //     {
        //         path: '/test/2',
        //         component: LiteratureCard
        //     }
        // ]
    },
    {
        path: '/index',
        name: '首页',
        redirect: '/search'
    },
    {
        path: '/searchRes',
        name: '搜索结果',
        component: SearchPageView
    }
];

let router = new Router({
    routes: constRouter
});

const whiteList = ['/login', '/search', '/index', '/searchRes'];

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

    let token = db.get('USER_TOKEN');
    let user = db.get('USER');
    let userRouter = db.get('USER_ROUTER');
    if (token.length && user) {
        if (!asyncRouter) {
            if (!userRouter) {
                request.get(`menu/${user.username}`).then((res) => {
                    asyncRouter = res.data;
                    save('USER_ROUTER', asyncRouter);
                    go(to, next);
                }).catch(err => {
                    console.error(err);
                });
            } else {
                asyncRouter = userRouter;
                go(to, next);
            }
        } else {
            next();
        }
    } else {
        next('/index');
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

function save (name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

function filterAsyncRouter (routes) {
    return routes.filter((route) => {
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
