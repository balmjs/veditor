import Vue from 'vue';
import App from '@/views/layout/app';
import dtd from './editor/core/dtd';
import domUtils, { fillCharReg } from './editor/core/dom-utils';
import Test from './test';
import Range from './editor/core/range';
import Selection from './editor/core/selection';

let rng = new Range(document);
let s = new Selection(document);
console.log(fillCharReg);

new Vue({
  el: '#app',
  components: { App },
  template: `<App />`
});
