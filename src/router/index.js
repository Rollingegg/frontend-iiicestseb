'use strict';

import Vue from 'vue';
import Router from 'vue-router';
/*
import pages, @=src
import LoginView from '@/views/login/Common';
import searchInputView from '@/views/searchInput/SearchInput';
import searchResultView from '@/views/search/ResultPage';
import IndexView from '@/views/Index';
import articleDetailView from '@/views/article/ArticleDetailPage';
import uploadView from '@/views/excel/Excel';
import authorDetailView from '@/views/author/AuthorPage';
import affiliationDetailView from '@/views/affiliation/AffiliationPage';
import keywordDetailView from '@/views/keyword/KeywordPage';
import noFoundDetailView from '@/views/error/404';
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
                path: 'rank/experts',
                name: 'ExpertsRankPage',
                component: ()=>import('@/views/rank/ExpertsRank'),
                redirect: 'rank/experts/',
                children: [
                    {
                        path: '/',
                        name: 'ExpertsRankOverviewPage',
                        component: ()=>import('@/views/rank/ExpertsRankOverview'),
                    }
                ]
            }]
    }
];

let router = new Router({
    mode: 'history',
    routes: constRouter,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

const whiteList = ['/login', '/searchFrame/searchHome', '/searchFrame/searchResult'];

let asyncRouter;

// 导航守卫，渲染动态路由
/**
 * @param to 目的路径
 * @param from 来源路径
 * @param next 处理函数
 */
router.beforeEach((to, from, next) => {
    let user = get('USER');

    // 检测白名单
    if (!user && whiteList.indexOf(to.path) !== -1) {
        next();
        return;
    }

    let userRouter = get('USER_ROUTER');
    if (user) {
        if (!asyncRouter) {
            if (!userRouter) {
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
                if (user.privilegeLevel === '管理员') {
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
                go(to, next);
            } else {
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

function go (to, next) {
    asyncRouter = filterAsyncRouter(asyncRouter);
    asyncRouter.forEach((r) => {
            router.options.routes[1].children.push(r);
        }
    );
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

function filterAsyncRouter (routes) {
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

function view (path) {
    // return resolve => require(["@/views/" + path + ""], resolve)
    return function (resolve) {
        import(`@/views/${path}.vue`).then(mod => {
            resolve(mod)
        })
    }
}


function get (name) {
    return JSON.parse(localStorage.getItem(name));
}

function save (name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

export default router;
