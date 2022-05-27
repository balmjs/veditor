/**
 * 获取节点node所属的window对象
 * @method  getWindow
 * @param { Node } node 节点对象
 * @return { Window } 当前节点所属的window对象
 * @example
 * ```javascript
 * //output: true
 * console.log( UE.dom.domUtils.getWindow( document.body ) === window );
 * ```
 */
export default function (node) {
  let doc = node.ownerDocument || node;
  return doc.defaultView || doc.parentWindow;
}
