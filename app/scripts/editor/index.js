// UEDITOR_CONFIG = window.UEDITOR_CONFIG || {};

// var baidu = window.baidu || {};

// window.baidu = baidu;

// window.UE = baidu.editor = window.UE || {};

// UE.plugins = {};

// UE.commands = {};

// UE.instants = {};

// UE.I18N = {};

// UE._customizeUI = {};

// UE.version = '1.4.3';

// var dom = (UE.dom = {});

// var handleEvent = function (name, detail) {
//   var event = new CustomEvent(name, {
//     detail: Object.assign(
//       {
//         refreshImage: domUtils.setAttributes
//       },
//       detail
//     )
//   });
//   window.dispatchEvent(event);
// };

import ajax from './core/ajax';
import utils from './core/utils';
import browser from './core/browser';

export default {
  ajax,
  utils,
  browser,
  commands: {},
  dom: {},
  instants: {},
  I18N: {},
  plugins: {},
  version: '1.4.3',
  _customizeUI: {}
};
