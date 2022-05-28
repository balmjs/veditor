/**
 * 设置Range的结束位置到node节点内的第一个节点之前
 * @method  setEndAtFirst
 * @param { Node } node 目标节点
 * @remind 选区的结束容器将变成给定的节点， 且偏移量为0
 * @remind node必须是一个元素节点， 且必须是允许包含子节点的元素。
 * @see UE.dom.Range:setStartAtFirst(Node)
 * @return { UE.dom.Range } 当前range对象
 */

export default function (node) {
  return this.setEnd(node, 0);
}
