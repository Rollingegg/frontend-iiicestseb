import db from './localstorage'; // '@/utils/localstorage';

import axios from 'axios';

import {
    MessageBox,
    Message,
    Notification
} from 'element-ui';
import moment from 'moment';
import store from '../store';

moment.locale('zh-cn');

// 统一配置
let BACKEND_REQUEST = axios.create({
    baseURL: process.env.BASE_API,
    responseType: 'json',
    validateStatus (status) {
        // 200 外的状态码都认定为失败
        return status === 200;
    }
});

// 默认拦截请求
BACKEND_REQUEST.interceptors.request.use((config) => {
    let expireTime = store.state.account.expireTime;
    let now = Date.now();
    // 让token早10秒种过期，提升“请重新登录”弹窗体验
    if (now - expireTime >= -10) {
        MessageBox.alert('很抱歉，登录已过期，请重新登录',{
            title: '登录已过期',
            confirmButtonText: '退出登陆',
            type: 'error',
        }).then(() => {
                db.clear();
                location.reload();
            }
        ).catch(function (reason) {
            console.log('catch:', reason);
        });
    }
    // 有 token就带上
    if (store.state.account.token) {
        config.headers.Authentication = store.state.account.token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 拦截响应
BACKEND_REQUEST.interceptors.response.use((config) => {
    return config;
}, (error) => {
    if (error.response) {
        let errorMessage = error.response.data === null ? '系统内部异常，请联系网站管理员' : error.response.data.message;
        switch (error.response.status) {
            case 404:
                Notification.error({
                    title: '系统提示',
                    message: '很抱歉，资源未找到'
                });
                break;
            case 403:
            case 401:
                Notification.warn({
                    title: '系统提示',
                    message: '很抱歉，您无法访问该资源，可能是因为没有相应权限或者登录已失效'
                });
                break;
            default:
                Notification.error({
                    title: '系统提示',
                    message: errorMessage
                });
                break;
        }
    }
    return Promise.reject(error);
});

const request = {
    postJson (url, params) {
        return BACKEND_REQUEST.post(url, params, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    },
    post (url, params) {
        return BACKEND_REQUEST.post(url, params, {
            transformRequest: [(params) => {
                let result = '';
                Object.keys(params).forEach((key) => {
                    if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
                        result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
                    }
                });
                return result;
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    put (url, params) {
        return BACKEND_REQUEST.put(url, params, {
            transformRequest: [(params) => {
                let result = '';
                Object.keys(params).forEach((key) => {
                    if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
                        result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
                    }
                });
                return result;
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    get (url, params) {
        let _params;
        if (Object.is(params, undefined)) {
            _params = '';
        } else {
            _params = '?';
            for (let key in params) {
                if (params.hasOwnProperty(key) && params[key] !== null) {
                    _params += `${key}=${params[key]}&`;
                }
            }
        }
        return BACKEND_REQUEST.get(`${url}${_params.substr(0, _params.length - 1)}`);
    },
    delete (url, params) {
        let _params;
        if (Object.is(params, undefined)) {
            _params = '';
        } else {
            _params = '?';
            for (let key in params) {
                if (params.hasOwnProperty(key) && params[key] !== null) {
                    _params += `${key}=${params[key]}&`;
                }
            }
        }
        return BACKEND_REQUEST.delete(`${url}${_params.substr(0, _params.length - 1)}`);
    },
    export (url, params = {}) {
        Message.info({
            showClose: true,
            message: '导出数据中'
        });
        return BACKEND_REQUEST.post(url, params, {
            transformRequest: [(params) => {
                let result = '';
                Object.keys(params).forEach((key) => {
                    if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
                        result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
                    }
                });
                return result;
            }],
            responseType: 'blob'
        }).then((r) => {
            const content = r.data;
            const blob = new Blob([content]);
            const fileName = `${new Date().getTime()}_导出结果.xlsx`;
            if ('download' in document.createElement('a')) {
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href);
                document.body.removeChild(elink);
            } else {
                navigator.msSaveBlob(blob, fileName);
            }
        }).catch((r) => {
            console.error(r);
            Message.error({
                showClose: true,
                message: '导出失败'
            });
        });
    },
    download (url, params, filename) {
        Message.info({
            showClose: true,
            message: '文件传输中'
        });
        return BACKEND_REQUEST.post(url, params, {
            transformRequest: [(params) => {
                let result = '';
                Object.keys(params).forEach((key) => {
                    if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
                        result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
                    }
                });
                return result;
            }],
            responseType: 'blob'
        }).then((r) => {
            const content = r.data;
            const blob = new Blob([content]);
            if ('download' in document.createElement('a')) {
                const elink = document.createElement('a');
                elink.download = filename;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href);
                document.body.removeChild(elink);
            } else {
                navigator.msSaveBlob(blob, filename);
            }
        }).catch((r) => {
            console.error(r);
            Message.error({
                showClose: true,
                message: '下载失败'
            });
        });
    },
    upload (url, params) {
        return BACKEND_REQUEST.post(url, params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};

export default request;
