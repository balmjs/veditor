/**
 * 选中给定节点内部的所有节点
 * @method  selectNodeContents
 * @remind 此时， 选区的开始容器和结束容器都是该节点， 其startOffset为0，
 *          而endOffset是该节点的子节点数。
 * @param { Node } node 目标节点， 当前range将包含该节点内的所有节点
 * @return { UE.dom.Range } 当前range对象， 此时range仅包含给定节点的所有子节点
 * @example
 * ```html
 * <!-- 选区示例 -->
 * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
 *
 * <script>
 *
 *     //执行操作
 *     range.selectNode( document.getElementsByTagName("b")[0] );
 *
 *     //结果选区
 *     //<b>[xx<i>xxx</i><span>xxx</span>xxx]</b>
 *
 * </script>
 * ```
 */
export default function (node) {
  return this.setStart(node, 0).setEndAtLast(node);
}
