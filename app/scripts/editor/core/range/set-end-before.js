import domUtils from '../dom-utils';

/**
 * 将Range结束位置设置到node节点之前
 * @method  setEndBefore
 * @remind 该操作将会把给定节点的父节点作为range的结束容器， 且偏移量是该节点在其父节点中的位置索引
 * @param { Node } node 目标节点
 * @see UE.dom.Range:setEndAfter(Node)
 * @return { UE.dom.Range } 当前range对象
 */

export default function (node) {
  return this.setEnd(node.parentNode, domUtils.getNodeIndex(node));
}
