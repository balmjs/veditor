import domUtils from '../dom-utils';

/**
 * 遍历range内的节点。每当遍历一个节点时， 都会执行参数项 doFn 指定的函数， 该函数的接受当前遍历的节点
 * 作为其参数。
 * @method traversal
 * @param { Function }  doFn 对每个遍历的节点要执行的方法， 该方法接受当前遍历的节点作为其参数
 * @return { UE.dom.Range } 当前range对象
 * @example
 * ```html
 *
 * <body>
 *
 *     <!-- 选区开始 -->
 *     <span></span>
 *     <a></a>
 *     <!-- 选区结束 -->
 * </body>
 *
 * <script>
 *
 *     //output: <span></span><a></a>
 *     console.log( range.cloneContents() );
 *
 *     range.traversal( function ( node ) {
 *
 *         if ( node.nodeType === 1 ) {
 *             node.className = "test";
 *         }
 *
 *     } );
 *
 *     //output: <span class="test"></span><a class="test"></a>
 *     console.log( range.cloneContents() );
 *
 * </script>
 * ```
 */

/**
 * 遍历range内的节点。
 * 每当遍历一个节点时， 都会执行参数项 doFn 指定的函数， 该函数的接受当前遍历的节点
 * 作为其参数。
 * 可以通过参数项 filterFn 来指定一个过滤器， 只有符合该过滤器过滤规则的节点才会触
 * 发doFn函数的执行
 * @method traversal
 * @param { Function } doFn 对每个遍历的节点要执行的方法， 该方法接受当前遍历的节点作为其参数
 * @param { Function } filterFn 过滤器， 该函数接受当前遍历的节点作为参数， 如果该节点满足过滤
 *                      规则， 请返回true， 该节点会触发doFn， 否则， 请返回false， 则该节点不
 *                      会触发doFn。
 * @return { UE.dom.Range } 当前range对象
 * @see UE.dom.Range:traversal(Function)
 * @example
 * ```html
 *
 * <body>
 *
 *     <!-- 选区开始 -->
 *     <span></span>
 *     <a></a>
 *     <!-- 选区结束 -->
 * </body>
 *
 * <script>
 *
 *     //output: <span></span><a></a>
 *     console.log( range.cloneContents() );
 *
 *     range.traversal( function ( node ) {
 *
 *         node.className = "test";
 *
 *     }, function ( node ) {
 *          return node.nodeType === 1;
 *     } );
 *
 *     //output: <span class="test"></span><a class="test"></a>
 *     console.log( range.cloneContents() );
 *
 * </script>
 * ```
 */
export default function (doFn, filterFn) {
  if (this.collapsed) return this;
  var bookmark = this.createBookmark(),
    end = bookmark.end,
    current = domUtils.getNextDomNode(bookmark.start, false, filterFn);
  while (
    current &&
    current !== end &&
    domUtils.getPosition(current, end) & domUtils.POSITION_PRECEDING
  ) {
    var tmpNode = domUtils.getNextDomNode(current, false, filterFn);
    doFn(current);
    current = tmpNode;
  }
  return this.moveToBookmark(bookmark);
}
