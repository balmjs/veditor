import domUtils from '../dom-utils';
import dtd from '../dtd';

/**
 * 调整range的开始位置和结束位置，使其"收缩"到最小的位置
 * @method  shrinkBoundary
 * @return { UE.dom.Range } 当前range对象
 * @example
 * ```html
 * <span>xx<b>xx[</b>xxxxx]</span> => <span>xx<b>xx</b>[xxxxx]</span>
 * ```
 *
 * @example
 * ```html
 * <!-- 选区示例 -->
 * <b>x[xx</b><i>]xxx</i>
 *
 * <script>
 *
 *     //执行收缩
 *     range.shrinkBoundary();
 *
 *     //结果选区
 *     //<b>x[xx]</b><i>xxx</i>
 * </script>
 * ```
 *
 * @example
 * ```html
 * [<b><i>xxxx</i>xxxxxxx</b>] => <b><i>[xxxx</i>xxxxxxx]</b>
 * ```
 */

/**
 * 调整range的开始位置和结束位置，使其"收缩"到最小的位置，
 * 如果ignoreEnd的值为true，则忽略对结束位置的调整
 * @method  shrinkBoundary
 * @param { Boolean } ignoreEnd 是否忽略对结束位置的调整
 * @return { UE.dom.Range } 当前range对象
 * @see UE.dom.domUtils.Range:shrinkBoundary()
 */
export default function (ignoreEnd) {
  let me = this,
    child,
    collapsed = me.collapsed;
  function check(node) {
    return (
      node.nodeType == 1 &&
      !domUtils.isBookmarkNode(node) &&
      !dtd.$empty[node.tagName] &&
      !dtd.$nonChild[node.tagName]
    );
  }
  while (
    me.startContainer.nodeType == 1 && //是element
    (child = me.startContainer.childNodes[me.startOffset]) && //子节点也是element
    check(child)
  ) {
    me.setStart(child, 0);
  }
  if (collapsed) {
    return me.collapse(true);
  }
  if (!ignoreEnd) {
    while (
      me.endContainer.nodeType == 1 && //是element
      me.endOffset > 0 && //如果是空元素就退出 endOffset=0那么endOffst-1为负值，childNodes[endOffset]报错
      (child = me.endContainer.childNodes[me.endOffset - 1]) && //子节点也是element
      check(child)
    ) {
      me.setEnd(child, child.childNodes.length);
    }
  }
  return me;
}
