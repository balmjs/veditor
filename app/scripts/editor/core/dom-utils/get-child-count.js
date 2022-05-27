/**
 * 获取子节点的数量
 * @method getChildCount
 * @param { Element } node 需要检测的元素
 * @return { Number } 给定的node元素的子节点数量
 * @example
 * ```html
 * <div id="test">
 *      <span></span>
 * </div>
 *
 * <script>
 *
 *     //output: 3
 *     console.log( UE.dom.domUtils.getChildCount( document.getElementById("test") ) );
 *
 * </script>
 * ```
 */

/**
 * 根据给定的过滤规则， 获取符合条件的子节点的数量
 * @method getChildCount
 * @param { Element } node 需要检测的元素
 * @param { Function } fn 过滤器， 要求对符合条件的子节点返回true， 反之则要求返回false
 * @return { Number } 符合过滤条件的node元素的子节点数量
 * @example
 * ```html
 * <div id="test">
 *      <span></span>
 * </div>
 *
 * <script>
 *
 *     //output: 1
 *     console.log( UE.dom.domUtils.getChildCount( document.getElementById("test"), function ( node ) {
 *
 *         return node.nodeType === 1;
 *
 *     } ) );
 *
 * </script>
 * ```
 */

const defaultFn = () => 1;

export default function (node, fn = defaultFn) {
  let count = 0,
    first = node.firstChild;
  while (first) {
    if (fn(first)) {
      count++;
    }
    first = first.nextSibling;
  }
  return count;
}
