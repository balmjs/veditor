/**
 * 向当前选区的结束处闭合选区
 * @method  collapse
 * @return { UE.dom.Range } 当前range对象
 * @example
 * ```html
 * <!-- 选区示例 -->
 * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
 *
 * <script>
 *
 *     //执行操作
 *     range.collapse();
 *
 *     //结果选区
 *     //“|”表示选区已闭合
 *     //<b>xx<i>xxx</i><span>xx|x</span>xxx</b>
 *
 * </script>
 * ```
 */

/**
 * 闭合当前选区，根据给定的toStart参数项决定是向当前选区开始处闭合还是向结束处闭合，
 * 如果toStart的值为true，则向开始位置闭合， 反之，向结束位置闭合。
 * @method  collapse
 * @param { Boolean } toStart 是否向选区开始处闭合
 * @return { UE.dom.Range } 当前range对象，此时range对象处于闭合状态
 * @see UE.dom.Range:collapse()
 * @example
 * ```html
 * <!-- 选区示例 -->
 * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
 *
 * <script>
 *
 *     //执行操作
 *     range.collapse( true );
 *
 *     //结果选区
 *     //“|”表示选区已闭合
 *     //<b>xx<i>xxx</i><span>|xxx</span>xxx</b>
 *
 * </script>
 * ```
 */
export default function (toStart) {
  var me = this;
  if (toStart) {
    me.endContainer = me.startContainer;
    me.endOffset = me.startOffset;
  } else {
    me.startContainer = me.endContainer;
    me.startOffset = me.endOffset;
  }
  me.collapsed = true;
  return me;
}
