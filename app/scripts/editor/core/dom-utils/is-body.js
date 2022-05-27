/**
 * 检测node节点是否为body节点
 * @method isBody
 * @param { Element } node 需要检测的dom元素
 * @return { Boolean } 给定的元素是否是body元素
 * @example
 * ```javascript
 * //output: true
 * console.log( UE.dom.domUtils.isBody( document.body ) );
 * ```
 */
export default function (node) {
  return node && node.nodeType == 1 && node.tagName.toLowerCase() == 'body';
}
