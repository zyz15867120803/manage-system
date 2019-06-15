// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import iView from 'iview';
import VCharts from 'v-charts';
import 'iview/dist/styles/iview.css';

import 'common/stylus/index.styl';

Vue.use(iView);
Vue.use(VCharts);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
