import domUtils from '../dom-utils';
import selectOneNode from './select-one-node';
/**
 * 获取离当前选区内包含的所有节点最近的公共祖先节点，
 * @method  getCommonAncestor
 * @remind 返回的公共祖先节点一定不是range自身的容器节点， 但有可能是一个文本节点
 * @return { Node } 当前range对象内所有节点的公共祖先节点
 * @example
 * ```html
 * //选区示例
 * <span>xxx<b>x[x<em>xx]x</em>xxx</b>xx</span>
 * <script>
 *
 *     var node = range.getCommonAncestor();
 *
 *     //公共祖先节点是： b节点
 *     //输出： B
 *     console.log(node.tagName);
 *
 * </script>
 * ```
 */

/**
 * 获取当前选区所包含的所有节点的公共祖先节点， 可以根据给定的参数 includeSelf 决定获取到
 * 的公共祖先节点是否可以是当前选区的startContainer或endContainer节点， 如果 includeSelf
 * 的取值为true， 则返回的节点可以是自身的容器节点， 否则， 则不能是容器节点
 * @method  getCommonAncestor
 * @param { Boolean } includeSelf 是否允许获取到的公共祖先节点是当前range对象的容器节点
 * @return { Node } 当前range对象内所有节点的公共祖先节点
 * @see UE.dom.Range:getCommonAncestor()
 * @example
 * ```html
 * <body>
 *
 *     <!-- 选区示例 -->
 *     <b>xxx<i>xxxx<span>xx[x</span>xx]x</i>xxxxxxx</b>
 *
 *     <script>
 *
 *         var node = range.getCommonAncestor( false );
 *
 *         //这里的公共祖先节点是B而不是I， 是因为参数限制了获取到的节点不能是容器节点
 *         //output: B
 *         console.log( node.tagName );
 *
 *     </script>
 *
 * </body>
 * ```
 */

/**
 * 获取当前选区所包含的所有节点的公共祖先节点， 可以根据给定的参数 includeSelf 决定获取到
 * 的公共祖先节点是否可以是当前选区的startContainer或endContainer节点， 如果 includeSelf
 * 的取值为true， 则返回的节点可以是自身的容器节点， 否则， 则不能是容器节点； 同时可以根据
 * ignoreTextNode 参数的取值决定是否忽略类型为文本节点的祖先节点。
 * @method  getCommonAncestor
 * @param { Boolean } includeSelf 是否允许获取到的公共祖先节点是当前range对象的容器节点
 * @param { Boolean } ignoreTextNode 获取祖先节点的过程中是否忽略类型为文本节点的祖先节点
 * @return { Node } 当前range对象内所有节点的公共祖先节点
 * @see UE.dom.Range:getCommonAncestor()
 * @see UE.dom.Range:getCommonAncestor(Boolean)
 * @example
 * ```html
 * <body>
 *
 *     <!-- 选区示例 -->
 *     <b>xxx<i>xxxx<span>x[x]x</span>xxx</i>xxxxxxx</b>
 *
 *     <script>
 *
 *         var node = range.getCommonAncestor( true, false );
 *
 *         //output: SPAN
 *         console.log( node.tagName );
 *
 *     </script>
 *
 * </body>
 * ```
 */
export default function (includeSelf, ignoreTextNode) {
  let me = this,
    start = me.startContainer,
    end = me.endContainer;
  if (start === end) {
    if (includeSelf && selectOneNode(this)) {
      start = start.childNodes[me.startOffset];
      if (start.nodeType == 1) return start;
    }
    //只有在上来就相等的情况下才会出现是文本的情况
    return ignoreTextNode && start.nodeType == 3 ? start.parentNode : start;
  }
  return domUtils.getCommonAncestor(start, end);
}
