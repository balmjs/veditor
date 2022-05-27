import isBookmarkNode from './is-bookmark-node';
import isSameElement from './is-same-element';
import remove from './remove';

/**
 * 合并节点node的左右兄弟节点
 * @method mergeSibling
 * @param { Element } node 需要合并的目标节点
 * @example
 * ```html
 * <b>xxxx</b><b id="test">ooo</b><b>xxxx</b>
 *
 * <script>
 *     var demoNode = document.getElementById("test");
 *     UE.dom.domUtils.mergeSibling( demoNode );
 *     //output: xxxxoooxxxx
 *     console.log( demoNode.innerHTML );
 * </script>
 * ```
 */

/**
 * 合并节点node的左右兄弟节点， 可以根据给定的条件选择是否忽略合并左节点。
 * @method mergeSibling
 * @param { Element } node 需要合并的目标节点
 * @param { Boolean } ignorePre 是否忽略合并左节点
 * @example
 * ```html
 * <b>xxxx</b><b id="test">ooo</b><b>xxxx</b>
 *
 * <script>
 *     var demoNode = document.getElementById("test");
 *     UE.dom.domUtils.mergeSibling( demoNode, true );
 *     //output: oooxxxx
 *     console.log( demoNode.innerHTML );
 * </script>
 * ```
 */

/**
 * 合并节点node的左右兄弟节点，可以根据给定的条件选择是否忽略合并左右节点。
 * @method mergeSibling
 * @param { Element } node 需要合并的目标节点
 * @param { Boolean } ignorePre 是否忽略合并左节点
 * @param { Boolean } ignoreNext 是否忽略合并右节点
 * @remind 如果同时忽略左右节点， 则该操作什么也不会做
 * @example
 * ```html
 * <b>xxxx</b><b id="test">ooo</b><b>xxxx</b>
 *
 * <script>
 *     var demoNode = document.getElementById("test");
 *     UE.dom.domUtils.mergeSibling( demoNode, false, true );
 *     //output: xxxxooo
 *     console.log( demoNode.innerHTML );
 * </script>
 * ```
 */
export default function (node, ignorePre, ignoreNext) {
  function merge(rtl, start, node) {
    var next;
    if (
      (next = node[rtl]) &&
      !isBookmarkNode(next) &&
      next.nodeType == 1 &&
      isSameElement(node, next)
    ) {
      while (next.firstChild) {
        if (start == 'firstChild') {
          node.insertBefore(next.lastChild, node.firstChild);
        } else {
          node.appendChild(next.firstChild);
        }
      }
      remove(next);
    }
  }
  !ignorePre && merge('previousSibling', 'firstChild', node);
  !ignoreNext && merge('nextSibling', 'lastChild', node);
}
