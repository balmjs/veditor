import remove from './remove';
import isBookmarkNode from './is-bookmark-node';
import isEmptyInlineElement from './is-empty-inline-element';
import fillChar from './fill-char';

/**
 * 清除node节点左右连续为空的兄弟inline节点
 * @method clearEmptySibling
 * @param { Node } node 执行的节点对象， 如果该节点的左右连续的兄弟节点是空的inline节点，
 * 则这些兄弟节点将被删除
 * @grammar UE.dom.domUtils.clearEmptySibling(node,ignoreNext)  //ignoreNext指定是否忽略右边空节点
 * @grammar UE.dom.domUtils.clearEmptySibling(node,ignoreNext,ignorePre)  //ignorePre指定是否忽略左边空节点
 * @example
 * ```html
 * <body>
 *     <div></div>
 *     <span id="test"></span>
 *     <i></i>
 *     <b></b>
 *     <em>xxx</em>
 *     <span></span>
 * </body>
 * <script>
 *
 *      UE.dom.domUtils.clearEmptySibling( document.getElementById( "test" ) );
 *
 *      //output: <div></div><span id="test"></span><em>xxx</em><span></span>
 *      console.log( document.body.innerHTML );
 *
 * </script>
 * ```
 */

/**
 * 清除node节点左右连续为空的兄弟inline节点， 如果ignoreNext的值为true，
 * 则忽略对右边兄弟节点的操作。
 * @method clearEmptySibling
 * @param { Node } node 执行的节点对象， 如果该节点的左右连续的兄弟节点是空的inline节点，
 * @param { Boolean } ignoreNext 是否忽略忽略对右边的兄弟节点的操作
 * 则这些兄弟节点将被删除
 * @see UE.dom.domUtils.clearEmptySibling(Node)
 */

/**
 * 清除node节点左右连续为空的兄弟inline节点， 如果ignoreNext的值为true，
 * 则忽略对右边兄弟节点的操作， 如果ignorePre的值为true，则忽略对左边兄弟节点的操作。
 * @method clearEmptySibling
 * @param { Node } node 执行的节点对象， 如果该节点的左右连续的兄弟节点是空的inline节点，
 * @param { Boolean } ignoreNext 是否忽略忽略对右边的兄弟节点的操作
 * @param { Boolean } ignorePre 是否忽略忽略对左边的兄弟节点的操作
 * 则这些兄弟节点将被删除
 * @see UE.dom.domUtils.clearEmptySibling(Node)
 */
export default function (node, ignoreNext, ignorePre) {
  function clear(next, dir) {
    let tmpNode;
    while (
      next &&
      !isBookmarkNode(next) &&
      (isEmptyInlineElement(next) ||
        //这里不能把空格算进来会吧空格干掉，出现文字间的空格丢掉了
        !new RegExp('[^\t\n\r' + fillChar + ']').test(next.nodeValue))
    ) {
      tmpNode = next[dir];
      remove(next);
      next = tmpNode;
    }
  }
  !ignoreNext && clear(node.nextSibling, 'nextSibling');
  !ignorePre && clear(node.previousSibling, 'previousSibling');
}
