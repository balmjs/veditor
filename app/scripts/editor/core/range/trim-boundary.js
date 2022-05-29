import domUtils from '../dom-utils';

/**
 * 调整当前Range的开始和结束边界容器，如果是容器节点是文本节点,就调整到包含该文本节点的父节点上
 * @method trimBoundary
 * @remind 该操作有可能会引起文本节点被切开
 * @return { UE.dom.Range } 当前range对象
 * @example
 * ```html
 *
 * //选区示例
 * <b>xxx<i>[xxxxx]</i>xxx</b>
 *
 * <script>
 *     //未调整前， 选区的开始容器和结束都是文本节点
 *     //执行调整
 *     range.trimBoundary();
 *
 *     //调整之后， 容器节点变成了i节点
 *     //<b>xxx[<i>xxxxx</i>]xxx</b>
 * </script>
 * ```
 */

/**
 * 调整当前Range的开始和结束边界容器，如果是容器节点是文本节点,就调整到包含该文本节点的父节点上，
 * 可以根据 ignoreEnd 参数的值决定是否调整对结束边界的调整
 * @method trimBoundary
 * @param { Boolean } ignoreEnd 是否忽略对结束边界的调整
 * @return { UE.dom.Range } 当前range对象
 * @example
 * ```html
 *
 * //选区示例
 * <b>xxx<i>[xxxxx]</i>xxx</b>
 *
 * <script>
 *     //未调整前， 选区的开始容器和结束都是文本节点
 *     //执行调整
 *     range.trimBoundary( true );
 *
 *     //调整之后， 开始容器节点变成了i节点
 *     //但是， 结束容器没有发生变化
 *     //<b>xxx[<i>xxxxx]</i>xxx</b>
 * </script>
 * ```
 */
export default function (ignoreEnd) {
  this.txtToElmBoundary();
  let start = this.startContainer,
    offset = this.startOffset,
    collapsed = this.collapsed,
    end = this.endContainer;
  if (start.nodeType == 3) {
    if (offset == 0) {
      this.setStartBefore(start);
    } else {
      if (offset >= start.nodeValue.length) {
        this.setStartAfter(start);
      } else {
        var textNode = domUtils.split(start, offset);
        //跟新结束边界
        if (start === end) {
          this.setEnd(textNode, this.endOffset - offset);
        } else if (start.parentNode === end) {
          this.endOffset += 1;
        }
        this.setStartBefore(textNode);
      }
    }
    if (collapsed) {
      return this.collapse(true);
    }
  }
  if (!ignoreEnd) {
    offset = this.endOffset;
    end = this.endContainer;
    if (end.nodeType == 3) {
      if (offset == 0) {
        this.setEndBefore(end);
      } else {
        offset < end.nodeValue.length && domUtils.split(end, offset);
        this.setEndAfter(end);
      }
    }
  }
  return this;
}
