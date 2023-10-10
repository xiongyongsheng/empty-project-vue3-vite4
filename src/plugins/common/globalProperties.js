import * as utils from '@/utils/index';
export default {
  install(app, options) {
    // 添加一个可以在应用的任何组件实例中访问的全局 property。组件的 property 在命名冲突具有优先权。
    app.config.globalProperties.$ossPrefix = import.meta.env.VITE_OSS_PREFIX;
  }
};
