import { createPinia } from 'pinia';
import router from '@/router';
import UI from '@/plugins/common/UI.js';
import globalProperties from '@/plugins/common/globalProperties.js';
import commonComponents from '@/plugins/common/commonComponents.js';

import '@/style/common.css';

export default {
  install(app, options) {
    const pinia = createPinia();

    app.use(pinia);
    app.use(router);
    app.use(UI);
    app.use(globalProperties);
    app.use(commonComponents);
  }
};
