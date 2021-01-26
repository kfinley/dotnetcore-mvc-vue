import Vue from 'vue';

Vue.config.productionTip = false;

const layout = new Vue({
  el: '#layout',
  components: {
    layoutfooter: () => import('@/components/LayoutFooter.vue'),
  },
});
