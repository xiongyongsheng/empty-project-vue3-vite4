import { createRouter, createWebHashHistory, createWebHistory, START_LOCATION } from 'vue-router';
import { wxAuth } from 'dmc-utils';
// import { useUserStore } from "@/pinia/user";

const folder = import.meta.globEager('./modules/*.js');
const routes = [];
for (const path in folder) {
  // const fileName = path.replace(/(modules|\.\/|\.js|\/)/g, "");
  routes.push(...folder[path].default);
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach(async (to, from, next) => {
  next();
});

router.beforeResolve((to) => {});

router.afterEach((to) => {
  document.title = to.query._title || to.meta.title || import.meta.env.VITE_TITLE;
});

router.onError((error, to, from) => {});

export default router;
