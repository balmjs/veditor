import browser from '../browser';

/**
 * 在dom树ready之后执行给定的回调函数
 * @method domReady
 * @remind 如果在执行该方法的时候， dom树已经ready， 那么回调函数将立刻执行
 * @param { Function } fn dom树ready之后的回调函数
 * @example
 * ```javascript
 *
 * UE.utils.domReady( function () {
 *
 *     console.log('123');
 *
 * } );
 *
 * ```
 */

let fnArr = [];

const doReady = function (doc) {
  //确保onready只执行一次
  doc.isReady = true;
  for (let ci; (ci = fnArr.pop()); ci()) {}
};

export default function (onready, win = window) {
  let doc = win.document;
  onready && fnArr.push(onready);
  if (doc.readyState === 'complete') {
    doReady(doc);
  } else {
    doc.isReady && doReady(doc);
    if (browser.ie && browser.version != 11) {
      (function () {
        if (doc.isReady) return;
        try {
          doc.documentElement.doScroll('left');
        } catch (error) {
          setTimeout(arguments.callee, 0);
          return;
        }
        doReady(doc);
      })();
      win.attachEvent('onload', function () {
        doReady(doc);
      });
    } else {
      doc.addEventListener(
        'DOMContentLoaded',
        function () {
          doc.removeEventListener('DOMContentLoaded', arguments.callee, false);
          doReady(doc);
        },
        false
      );
      win.addEventListener(
        'load',
        function () {
          doReady(doc);
        },
        false
      );
    }
  }
}
