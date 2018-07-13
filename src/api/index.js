import axios from 'axios';
import env from '../../build/env';

const ajaxUrl = env === 'development'
    ? 'http://localhost:8090/'
    : env === 'production'
        ? 'https://www.url.com'
        : 'https://debug.url.com';

let http = axios.create({
    baseURL: ajaxUrl,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true,
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
});

function apiAxios (method, url, params, response) {
    http({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null
    }).then(function (res) {
        response(res);
    }).catch(function (err) {
        response(err);
    });
}

export default {
    get: function (url, params, response) {
        return apiAxios('GET', url, params, response);
    },
    post: function (url, params, response) {
        return apiAxios('POST', url, params, response);
    },
    put: function (url, params, response) {
        return apiAxios('PUT', url, params, response);
    },
    delete: function (url, params, response) {
        return apiAxios('DELETE', url, params, response);
    }
};
