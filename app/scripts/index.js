import Vue from 'vue';
import App from '@/views/layout/app';
import dtd from './editor/core/dtd';

console.log(dtd);

new Vue({
  el: '#app',
  components: { App },
  template: `<App />`
});
