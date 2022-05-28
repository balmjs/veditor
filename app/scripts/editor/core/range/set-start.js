import setEndPoint from './set-end-point';
/**
 * 设置Range的开始容器节点和偏移量
 * @method  setStart
 * @remind 如果给定的节点是元素节点，那么offset指的是其子元素中索引为offset的元素，
 *          如果是文本节点，那么offset指的是其文本内容的第offset个字符
 * @remind 如果提供的容器节点是一个不能包含子元素的节点， 则该选区的开始容器将被设置
 *          为该节点的父节点， 此时， 其距离开始容器的偏移量也变成了该节点在其父节点
 *          中的索引
 * @param { Node } node 将被设为当前选区开始边界容器的节点对象
 * @param { int } offset 选区的开始位置偏移量
 * @return { UE.dom.Range } 当前range对象
 * @example
 * ```html
 * <!-- 选区 -->
 * <b>xxx<i>x<span>xx</span>xx<em>xx</em>xxx</i>[xxx]</b>
 *
 * <script>
 *
 *     //执行操作
 *     range.setStart( document.getElementsByTagName("i")[0], 1 );
 *
 *     //此时， 选区变成了
 *     //<b>xxx<i>x[<span>xx</span>xx<em>xx</em>xxx</i>xxx]</b>
 *
 * </script>
 * ```
 * @example
 * ```html
 * <!-- 选区 -->
 * <b>xxx<img>[xx]x</b>
 *
 * <script>
 *
 *     //执行操作
 *     range.setStart( document.getElementsByTagName("img")[0], 3 );
 *
 *     //此时， 选区变成了
 *     //<b>xxx[<img>xx]x</b>
 *
 * </script>
 * ```
 */
export default function (node, offset) {
  return setEndPoint(true, node, offset, this);
}
