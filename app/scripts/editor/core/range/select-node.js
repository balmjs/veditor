/**
 * 选中给定节点
 * @method  selectNode
 * @remind 此时， 选区的开始容器和结束容器都是该节点的父节点， 其startOffset是该节点在父节点中的位置索引，
 *          而endOffset为startOffset+1
 * @param { Node } node 需要选中的节点
 * @return { UE.dom.Range } 当前range对象，此时的range仅包含当前给定的节点对象
 * @example
 * ```html
 * <!-- 选区示例 -->
 * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
 *
 * <script>
 *
 *     //执行操作
 *     range.selectNode( document.getElementsByTagName("i")[0] );
 *
 *     //结果选区
 *     //<b>xx[<i>xxx</i>]<span>xxx</span>xxx</b>
 *
 * </script>
 * ```
 */
export default function (node) {
  return this.setStartBefore(node).setEndAfter(node);
}
