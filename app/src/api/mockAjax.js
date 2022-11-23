// 对axios进行二次封装
import axios from 'axios';
// 引入进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
// console.log(nProgress);
// 1:利用axios对向上的方法create,创建一个axios实例
// 2：request就是axios,只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL: "/mock",
    timeout: 5000,
});
// 请求拦截器，发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    // 进度条开始
    nprogress.start();
    return config;
});

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done();
    return res.data;
    // return Promise.reject(res.data);
}, (error) => {
    // 响应失败的回调
    return Promise.reject(new error('faild'));
});
export default requests;