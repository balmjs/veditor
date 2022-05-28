import setEndPoint from './set-end-point';

/**
 * 设置Range的结束容器和偏移量
 * @method  setEnd
 * @param { Node } node 作为当前选区结束边界容器的节点对象
 * @param { int } offset 结束边界的偏移量
 * @see UE.dom.Range:setStart(Node,int)
 * @return { UE.dom.Range } 当前range对象
 */
export default function (node, offset) {
  return setEndPoint(false, node, offset, this);
}
