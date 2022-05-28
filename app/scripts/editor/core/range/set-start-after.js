import domUtils from '../dom-utils';

/**
 * 将Range开始位置设置到node节点之后
 * @method  setStartAfter
 * @remind 该操作将会把给定节点的父节点作为range的开始容器， 且偏移量是该节点在其父节点中的位置索引+1
 * @param { Node } node 选区的开始边界将紧接着该节点之后
 * @return { UE.dom.Range } 当前range对象
 * @example
 * ```html
 * <!-- 选区示例 -->
 * <b>xx<i>xxx</i><span>xx[x</span>xxx]</b>
 *
 * <script>
 *
 *     //执行操作
 *     range.setStartAfter( document.getElementsByTagName("i")[0] );
 *
 *     //结果选区
 *     //<b>xx<i>xxx</i>[<span>xxx</span>xxx]</b>
 *
 * </script>
 * ```
 */
export default function (node) {
  return this.setStart(node.parentNode, domUtils.getNodeIndex(node) + 1);
}
