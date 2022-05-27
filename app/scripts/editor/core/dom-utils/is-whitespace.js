/**
 * 检测文本节点textNode是否为空节点（包括空格、换行、占位符等字符）
 * @method  isWhitespace
 * @param { Node } node 需要检测的节点对象
 * @return { Boolean } 检测的节点是否为空
 * @example
 * ```html
 * <div id="test">
 *
 * </div>
 * <script>
 *      //output: true
 *      console.log( UE.dom.domUtils.isWhitespace( document.getElementById("test").firstChild ) );
 * </script>
 * ```
 */
export default function (node) {
  return !new RegExp('[^ \t\n\r' + domUtils.fillChar + ']').test(
    node.nodeValue
  );
}
