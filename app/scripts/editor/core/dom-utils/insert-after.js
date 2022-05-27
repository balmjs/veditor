/**
 * 在节点node后面插入新节点newNode
 * @method insertAfter
 * @param { Node } node 目标节点
 * @param { Node } newNode 新插入的节点， 该节点将置于目标节点之后
 * @return { Node } 新插入的节点
 */
export default function (node, newNode) {
  return node.nextSibling
    ? node.parentNode.insertBefore(newNode, node.nextSibling)
    : node.parentNode.appendChild(newNode);
}
