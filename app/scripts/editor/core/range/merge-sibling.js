import domUtils from '../dom-utils';

/**
 * @param node
 * @param dir
 */

export default function mergeSibling(node, dir) {
  var tmpNode;
  node = node[dir];
  while (node && domUtils.isFillChar(node)) {
    tmpNode = node[dir];
    domUtils.remove(node);
    node = tmpNode;
  }
}
