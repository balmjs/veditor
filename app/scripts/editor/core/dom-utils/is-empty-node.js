import getChildCount from './get-child-count';
import isBr from './is-br';
import isBookmarkNode from './is-bookmark-node';
import isWhitespace from './is-whitespace';

/**
 * 判断给定节点是否为空节点
 * @method isEmptyNode
 * @param { Node } node 需要检测的节点对象
 * @return { Boolean } 节点是否为空
 * @example
 * ```javascript
 * UE.dom.domUtils.isEmptyNode( document.body );
 * ```
 */
export default function (node) {
  return (
    !node.firstChild ||
    getChildCount(node, function (node) {
      return !isBr(node) && !isBookmarkNode(node) && !isWhitespace(node);
    }) == 0
  );
}
