'use strict';

import Vue from 'vue';
import db from '@/utils/localstorage'
import Router from 'vue-router';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})

// 全局Router异常处理
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => {
        if (typeof err!=='undefined') {
            console.warn(err.stack);
        }
    });
};
Vue.use(Router);

let constRouter = [
    {
        path: '/login',
        name: 'LoginPage',
        component: view('login/Common')
    },
    {
        path: '/',
        component: view('Index'),
        name: 'IndexPage',
        redirect: '/searchFrame/searchHome',
        children: [
            {
                path: 'searchFrame',
                name: 'HomePage',
                component: view('search/SearchFrame'),
                redirect: '/searchFrame/searchHome',
                children: [
                    {
                        path: 'searchHome',
                        name: 'searchHome',
                        component: view('search/SearchHome'),
                    },
                    {
                        path: 'searchResult',
                        name: 'searchResult',
                        component: view('search/SearchResult'),
                    }
                ]
            },
            {
                path: 'about',
                name: 'AboutPage',
                component: () => import('@/views/About')
            },
            {
                path: 'rank/experts',
                name: 'ExpertsRankPage',
                component: () => import('@/views/rank/ExpertsRank'),
                redirect: 'rank/experts/overview',
                children: [
                    {
                        path: 'overview',
                        name: 'ExpertsRankOverviewPage',
                        component: () => import('@/views/rank/ExpertsRankOverview'),
                        meta: {activeMenu: '/rank/experts'}
                    },
                    {
                        path: ':rankType',
                        name: 'ExpertsRankViewPage',
                        component: () => import('@/views/rank/ExpertsRankView'),
                        meta: {activeMenu: '/rank/experts'}
                    }
                ]
            }]
    }
];

const createRouter = () => new Router({
    mode: 'history',
    routes: constRouter,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    }
});
let router = createRouter()
const whiteList = ['/login', '/searchFrame/searchHome', '/searchFrame/searchResult', '/about'];

let asyncRouter;

/**
 * 导航守卫，渲染动态路由
 * @param to 目的路径
 * @param from 来源路径
 * @param next 处理函数
 */
router.beforeEach((to, from, next) => {
    // 每次切换页面时，调用进度条
    NProgress.start();
    // 若加载时间长且不定，担心进度条走完都没有加载完，可以调用
    NProgress.inc(); //这会以随机数量递增，且永远达不到100%，也可以设指定增量
    let user = db.get('USER');
    // console.log(user)
    // 检测白名单
    if (!user && whiteList.indexOf(to.path)!== -1) {
        next();
        return;
    }

    let userRouter = get('USER_ROUTER');
    if (user) {
        if (!asyncRouter) {
            // console.log('!asyncRouter')
            if (!userRouter) {
                // console.log('!userRouter')
                asyncRouter = [
                    {
                        path: 'authorDetail',
                        name: 'AuthorPage',
                        component: 'detail/AuthorPage'
                    },
                    {
                        path: 'affiliationDetail',
                        name: 'AffiliationPage',
                        component: 'detail/AffiliationPage'
                    },
                    {
                        path: 'keywordDetail',
                        name: 'TermPage',
                        component: 'detail/KeywordPage'
                    },
                    {
                        path: 'articleDetail',
                        name: 'ArticlePage',
                        component: 'detail/ArticleDetailPage'
                    }
                ];
                if (user.privilegeLevel==='管理员') {
                    asyncRouter.push({
                        path: 'upload',
                        name: 'UploadPage',
                        component: 'manage/upload/Upload'
                    });
                    asyncRouter.push({
                        path: 'articleManage',
                        name: 'SpiderPage',
                        component: 'manage/spider/ArticleSpider'
                    });
                }
                save('USER_ROUTER', asyncRouter);
                // console.log(router)
                go(to, next);
            } else {
                // console.log('userRouter')
                asyncRouter = userRouter;
                go(to, next);
            }
        } else {
            next();
        }
    } else {
        next('/login');
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})

function go(to, next) {
    asyncRouter = filterAsyncRouter(asyncRouter);
    if (router.options.routes[1].children) {
        asyncRouter.forEach((r) => {
                    router.options.routes[1].children.push(r);
                }
        );
    }
    // console.log(asyncRouter)
    router.options.routes.push({
        path: '*',
        name: '404',
        component: view('error/404')
    });
    router.addRoutes(router.options.routes);
    next({
        ...to,
        replace: true
    })
}

function filterAsyncRouter(routes) {
    return routes.filter((route) => {
        let component = route.component;
        if (component) {
            route.component = view(component);
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children);
            }
            return true;
        }
    });
}

function view(path) {
    // return resolve => require(["@/views/" + path + ""], resolve)
    return function (resolve) {
        import(`@/views/${path}.vue`).then(mod => {
            resolve(mod)
        })
    }
}


function get(name) {
    return JSON.parse(localStorage.getItem(name));
}

function save(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

export function resetRouter() {
    router.options.routes = constRouter // reset router
}

export default router;
