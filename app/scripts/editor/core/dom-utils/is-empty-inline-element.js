import isBookmarkNode from './is-bookmark-node';
import isWhitespace from './is-whitespace';
import dtd from '../dtd';

/**
 * 检查节点node是否是空inline节点
 * @method  isEmptyInlineElement
 * @param { Node } node 需要检测的节点对象
 * @return { Number }  如果给定的节点是空的inline节点， 则返回1, 否则返回0。
 * @example
 * ```html
 * <b><i></i></b> => 1
 * <b><i></i><u></u></b> => 1
 * <b></b> => 1
 * <b>xx<i></i></b> => 0
 * ```
 */
const isEmptyInlineElement = function (node) {
  if (node.nodeType != 1 || !dtd.$removeEmpty[node.tagName]) {
    return 0;
  }
  node = node.firstChild;
  while (node) {
    //如果是创建的bookmark就跳过
    if (isBookmarkNode(node)) {
      return 0;
    }
    if (
      (node.nodeType == 1 && !isEmptyInlineElement(node)) ||
      (node.nodeType == 3 && !isWhitespace(node))
    ) {
      return 0;
    }
    node = node.nextSibling;
  }
  return 1;
};

export default isEmptyInlineElement;
