import Vue from 'vue';
import App from '@/views/layout/app';
import dtd from './editor/core/dtd';
import domUtils from './editor/core/dom-utils';
import Test from './test';
import Range from './editor/core/range/index';

let rng = new Range(document);

new Vue({
  el: '#app',
  components: { App },
  template: `<App />`
});
