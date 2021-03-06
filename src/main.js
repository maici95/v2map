import Vue from 'vue';
import App from './App.vue';
import store from './store.js';

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

/* new Vue({
  render: h => h(App),
}).$mount('#app') */
