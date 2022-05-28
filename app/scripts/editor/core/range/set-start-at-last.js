/**
 * 设置Range的开始位置到node节点内的最后一个节点之后
 * @method setStartAtLast
 * @remind 选区的开始容器将变成给定的节点， 且偏移量为该节点的子节点数
 * @remind 如果给定的节点是元素节点， 则该节点必须是允许包含子节点的元素。
 * @param { Node } node 目标节点
 * @see UE.dom.Range:setStartAtFirst(Node)
 * @return { UE.dom.Range } 当前range对象
 */

export default function (node) {
  return this.setStart(
    node,
    node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length
  );
}
