import axios from 'axios';
import CookieUtil from 'common/js/util';

let instance = axios.create({
  timeout: 5000,
  responseType: 'json'
});

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  if (!(/^https:\/\/|http:\/\//.test(config.url))) {
    const token = CookieUtil.get('token');
    if (token && token !== 'undefined') {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = token;
    }
  }
  return config;
}, error => {
  // 对请求错误做些什么
  console.log(error);
  return Promise.reject(error);
});

export default instance;
