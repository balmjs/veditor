/**
 * 删除节点node及其下属的所有节点
 * @method remove
 * @param { Node } node 需要删除的节点对象
 * @return { Node } 返回刚删除的节点对象
 * @example
 * ```html
 * <div id="test">
 *     <div id="child">你好</div>
 * </div>
 * <script>
 *     UE.dom.domUtils.remove( document.body, false );
 *     //output: false
 *     console.log( document.getElementById( "child" ) !== null );
 * </script>
 * ```
 */

/**
 * 删除节点node，并根据keepChildren的值决定是否保留子节点
 * @method remove
 * @param { Node } node 需要删除的节点对象
 * @param { Boolean } keepChildren 是否需要保留子节点
 * @return { Node } 返回刚删除的节点对象
 * @example
 * ```html
 * <div id="test">
 *     <div id="child">你好</div>
 * </div>
 * <script>
 *     UE.dom.domUtils.remove( document.body, true );
 *     //output: true
 *     console.log( document.getElementById( "child" ) !== null );
 * </script>
 * ```
 */
export default function (node, keepChildren) {
  let parent = node.parentNode,
    child;
  if (parent) {
    if (keepChildren && node.hasChildNodes()) {
      while ((child = node.firstChild)) {
        parent.insertBefore(child, node);
      }
    }
    parent.removeChild(node);
  }
  return node;
}
