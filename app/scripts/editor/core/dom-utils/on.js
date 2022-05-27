import utils from '../utils';

/**
 * 为元素element绑定原生DOM事件，type为事件类型，handler为处理函数
 * @method on
 * @param { Node } element 需要绑定事件的节点对象
 * @param { String } type 绑定的事件类型
 * @param { Function } handler 事件处理器
 * @example
 * ```javascript
 * UE.dom.domUtils.on(document.body,"click",function(e){
 *     //e为事件对象，this为被点击元素对戏那个
 * });
 * ```
 */

/**
 * 为元素element绑定原生DOM事件，type为事件类型，handler为处理函数
 * @method on
 * @param { Node } element 需要绑定事件的节点对象
 * @param { Array } type 绑定的事件类型数组
 * @param { Function } handler 事件处理器
 * @example
 * ```javascript
 * UE.dom.domUtils.on(document.body,["click","mousedown"],function(evt){
 *     //evt为事件对象，this为被点击元素对象
 * });
 * ```
 */
export default function (element, type, handler) {
  let types = utils.isArray(type) ? type : utils.trim(type).split(/\s+/),
    k = types.length;
  if (k)
    while (k--) {
      type = types[k];
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else {
        if (!handler._d) {
          handler._d = {
            els: []
          };
        }
        let key = type + handler.toString(),
          index = utils.indexOf(handler._d.els, element);
        if (!handler._d[key] || index == -1) {
          if (index == -1) {
            handler._d.els.push(element);
          }
          if (!handler._d[key]) {
            handler._d[key] = function (evt) {
              return handler.call(evt.srcElement, evt || window.event);
            };
          }

          element.attachEvent('on' + type, handler._d[key]);
        }
      }
    }
  element = null;
}
