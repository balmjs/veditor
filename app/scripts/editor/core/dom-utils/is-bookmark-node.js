/**
 * 检测节点node是否属是UEditor定义的bookmark节点
 * @method isBookmarkNode
 * @private
 * @param { Node } node 需要检测的节点对象
 * @return { Boolean } 是否是bookmark节点
 * @example
 * ```html
 * <span id="_baidu_bookmark_1"></span>
 * <script>
 *      var bookmarkNode = document.getElementById("_baidu_bookmark_1");
 *      //output: true
 *      console.log( UE.dom.domUtils.isBookmarkNode( bookmarkNode ) );
 * </script>
 * ```
 */
export default function (node) {
  return node.nodeType == 1 && node.id && /^_baidu_bookmark_/i.test(node.id);
}
