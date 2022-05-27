/**
 * 检测节点的标签是否是给定的标签
 * @method isTagNode
 * @param { Node } node 需要检测的节点对象
 * @param { String } tagName 标签
 * @return { Boolean } 节点的标签是否是给定的标签
 * @example
 * ```html
 * <div id="test"></div>
 *
 * <script>
 *
 *     //output: true
 *     console.log( UE.dom.domUtils.isTagNode( document.getElementById("test"), "div" ) );
 *
 * </script>
 * ```
 */
export default function (node, tagNames) {
  return (
    node.nodeType == 1 &&
    new RegExp('\\b' + node.tagName + '\\b', 'i').test(tagNames)
  );
}
