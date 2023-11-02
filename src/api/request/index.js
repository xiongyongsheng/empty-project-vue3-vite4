import Axios from 'axios';
import '../mock';

class HttpRequest {
  constructor(commonOptions = {}) {
    this.instance = Axios.create(commonOptions);
    this.commonOptions = commonOptions;
    // 主请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 返回的 config.abortController.abort() 可以主动取消请求;
        config._callBack && config._callBack(config);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // 主响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        // console.info('主响应拦截器: ', response);
        return response;
      },
      (error) => {
        if (error.code === 'ERR_CANCELED') {
          console.warn('请求已取消: ', error);
        } else {
          console.error('主响应拦截器: ', error);
        }
        return Promise.reject(error);
      }
    );
  }
  create(options, callBack) {
    const isUseCallBack = typeof callBack === 'function';
    if (isUseCallBack) {
      options._callBack = callBack;
      // 添加主动取消请求参数
      options.abortController = new AbortController();
      options.signal = options.abortController.signal;
    }
    return this.instance.request({
      ...this.commonOptions,
      ...options
    });
  }
}

export default HttpRequest;
