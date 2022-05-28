import domUtils from '../dom-utils';

/**
 * 将Range开始位置设置到node节点之前
 * @method  setStartBefore
 * @remind 该操作将会把给定节点的父节点作为range的开始容器， 且偏移量是该节点在其父节点中的位置索引
 * @param { Node } node 新的选区开始位置在该节点之前
 * @see UE.dom.Range:setStartAfter(Node)
 * @return { UE.dom.Range } 当前range对象
 */
export default function (node) {
  return this.setStart(node.parentNode, domUtils.getNodeIndex(node));
}
