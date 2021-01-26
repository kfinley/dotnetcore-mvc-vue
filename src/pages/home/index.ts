import Vue from 'vue';
import store from '@/store';

Vue.config.productionTip = false;

const home = new Vue({
  el: '#home',
  components: {
    helloworld: () => import('@/components/HelloWorld.vue'),
  },
  store,
});
