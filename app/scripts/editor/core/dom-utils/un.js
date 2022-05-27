import utils from '../utils';
/**
 * 解除DOM事件绑定
 * @method un
 * @param { Node } element 需要解除事件绑定的节点对象
 * @param { String } type 需要接触绑定的事件类型
 * @param { Function } handler 对应的事件处理器
 * @example
 * ```javascript
 * UE.dom.domUtils.un(document.body,"click",function(evt){
 *     //evt为事件对象，this为被点击元素对象
 * });
 * ```
 */

/**
 * 解除DOM事件绑定
 * @method un
 * @param { Node } element 需要解除事件绑定的节点对象
 * @param { Array } type 需要接触绑定的事件类型数组
 * @param { Function } handler 对应的事件处理器
 * @example
 * ```javascript
 * UE.dom.domUtils.un(document.body, ["click","mousedown"],function(evt){
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
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else {
        let key = type + handler.toString();
        try {
          element.detachEvent(
            'on' + type,
            handler._d ? handler._d[key] : handler
          );
        } catch (e) {}
        if (handler._d && handler._d[key]) {
          let index = utils.indexOf(handler._d.els, element);
          if (index != -1) {
            handler._d.els.splice(index, 1);
          }
          handler._d.els.length == 0 && delete handler._d[key];
        }
      }
    }
}
