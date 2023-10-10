import home from '@/pages/common/home-page.vue';
import notFound from '@/pages/common/not-found.vue';

const routes = [
  {
    path: '/',
    meta: {
      title: 'Home',
      notAuth: true
    },
    component: home
  },
  {
    path: '/:pathMatch(.*)',
    meta: {
      title: '404',
      notAuth: true
    },
    component: notFound
  }
];

export default routes;
