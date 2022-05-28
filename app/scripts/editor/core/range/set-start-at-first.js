/**
 * 设置Range的开始位置到node节点内的第一个子节点之前
 * @method  setStartAtFirst
 * @remind 选区的开始容器将变成给定的节点， 且偏移量为0
 * @remind 如果给定的节点是元素节点， 则该节点必须是允许包含子节点的元素。
 * @param { Node } node 目标节点
 * @see UE.dom.Range:setStartBefore(Node)
 * @return { UE.dom.Range } 当前range对象
 * @example
 * ```html
 * <!-- 选区示例 -->
 * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
 *
 * <script>
 *
 *     //执行操作
 *     range.setStartAtFirst( document.getElementsByTagName("i")[0] );
 *
 *     //结果选区
 *     //<b>xx<i>[xxx</i><span>xx]x</span>xxx</b>
 *
 * </script>
 * ```
 */

export default function (node) {
  return this.setStart(node, 0);
}
