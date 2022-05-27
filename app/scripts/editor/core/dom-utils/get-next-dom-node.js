import getDomNode from './get-dom-node';

/**
 * 取得node节点的下一个兄弟节点， 如果该节点其后没有兄弟节点， 则递归查找其父节点之后的第一个兄弟节点，
 * 直到找到满足条件的节点或者递归到BODY节点之后才会结束。
 * @method getNextDomNode
 * @param { Node } node 需要获取其后的兄弟节点的节点对象
 * @return { Node | NULL } 如果找满足条件的节点， 则返回该节点， 否则返回NULL
 * @example
 * ```html
 *     <body>
 *      <div id="test">
 *          <span></span>
 *      </div>
 *      <i>xxx</i>
 * </body>
 * <script>
 *
 *     //output: i节点
 *     console.log( UE.dom.domUtils.getNextDomNode( document.getElementById( "test" ) ) );
 *
 * </script>
 * ```
 * @example
 * ```html
 * <body>
 *      <div>
 *          <span></span>
 *          <i id="test">xxx</i>
 *      </div>
 *      <b>xxx</b>
 * </body>
 * <script>
 *
 *     //由于id为test的i节点之后没有兄弟节点， 则查找其父节点（div）后面的兄弟节点
 *     //output: b节点
 *     console.log( UE.dom.domUtils.getNextDomNode( document.getElementById( "test" ) ) );
 *
 * </script>
 * ```
 */

/**
 * 取得node节点的下一个兄弟节点， 如果startFromChild的值为ture，则先获取其子节点，
 * 如果有子节点则直接返回第一个子节点；如果没有子节点或者startFromChild的值为false，
 * 则执行<a href="#UE.dom.domUtils.getNextDomNode(Node)">getNextDomNode(Node node)</a>的查找过程。
 * @method getNextDomNode
 * @param { Node } node 需要获取其后的兄弟节点的节点对象
 * @param { Boolean } startFromChild 查找过程是否从其子节点开始
 * @return { Node | NULL } 如果找满足条件的节点， 则返回该节点， 否则返回NULL
 * @see UE.dom.domUtils.getNextDomNode(Node)
 */
export default function (node, startFromChild, filterFn, guard) {
  return getDomNode(
    node,
    'firstChild',
    'nextSibling',
    startFromChild,
    filterFn,
    guard
  );
}
