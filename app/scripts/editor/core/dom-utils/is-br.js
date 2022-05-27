/**
 * 判断给定节点是否为br
 * @method isBr
 * @param { Node } node 需要判断的节点对象
 * @return { Boolean } 给定的节点是否是br节点
 */

export default function (node) {
  return node.nodeType == 1 && node.tagName == 'BR';
}
