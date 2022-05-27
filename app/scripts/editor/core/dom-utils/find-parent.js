import isBody from './is-body';
/**
 * 根据给定的过滤规则filterFn， 查找符合该过滤规则的node节点的第一个祖先节点，
 * 查找的起点是给定node节点的父节点。
 * @method findParent
 * @param { Node } node 需要查找的节点
 * @param { Function } filterFn 自定义的过滤方法。
 * @warning 查找的终点是到body节点为止
 * @remind 自定义的过滤方法filterFn接受一个Node对象作为参数， 该对象代表当前执行检测的祖先节点。 如果该
 *          节点满足过滤条件， 则要求返回true， 这时将直接返回该节点作为findParent()的结果， 否则， 请返回false。
 * @return { Node | Null } 如果找到符合过滤条件的节点， 就返回该节点， 否则返回NULL
 * @example
 * ```javascript
 * var filterNode = UE.dom.domUtils.findParent( document.body.firstChild, function ( node ) {
 *
 *     //由于查找的终点是body节点， 所以永远也不会匹配当前过滤器的条件， 即这里永远会返回false
 *     return node.tagName === "HTML";
 *
 * } );
 *
 * //output: true
 * console.log( filterNode === null );
 * ```
 */

/**
 * 根据给定的过滤规则filterFn， 查找符合该过滤规则的node节点的第一个祖先节点，
 * 如果includeSelf的值为true，则查找的起点是给定的节点node， 否则， 起点是node的父节点
 * @method findParent
 * @param { Node } node 需要查找的节点
 * @param { Function } filterFn 自定义的过滤方法。
 * @param { Boolean } includeSelf 查找过程是否包含自身
 * @warning 查找的终点是到body节点为止
 * @remind 自定义的过滤方法filterFn接受一个Node对象作为参数， 该对象代表当前执行检测的祖先节点。 如果该
 *          节点满足过滤条件， 则要求返回true， 这时将直接返回该节点作为findParent()的结果， 否则， 请返回false。
 * @remind 如果includeSelf为true， 则过滤器第一次执行时的参数会是节点本身。
 *          反之， 过滤器第一次执行时的参数将是该节点的父节点。
 * @return { Node | Null } 如果找到符合过滤条件的节点， 就返回该节点， 否则返回NULL
 * @example
 * ```html
 * <body>
 *
 *      <div id="test">
 *      </div>
 *
 *      <script type="text/javascript">
 *
 *          //output: DIV, BODY
 *          var filterNode = UE.dom.domUtils.findParent( document.getElementById( "test" ), function ( node ) {
 *
 *              console.log( node.tagName );
 *              return false;
 *
 *          }, true );
 *
 *      </script>
 * </body>
 * ```
 */
export default function (node, filterFn, includeSelf) {
  if (node && !isBody(node)) {
    node = includeSelf ? node : node.parentNode;
    while (node) {
      if (!filterFn || filterFn(node) || isBody(node)) {
        return filterFn && !filterFn(node) && isBody(node) ? null : node;
      }
      node = node.parentNode;
    }
  }
  return null;
}
