/**
 * 获取节点A相对于节点B的位置关系
 * @method getPosition
 * @param { Node } nodeA 需要查询位置关系的节点A
 * @param { Node } nodeB 需要查询位置关系的节点B
 * @return { Number } 节点A与节点B的关系
 * @example
 * ```javascript
 * //output: 20
 * var position = UE.dom.domUtils.getPosition( document.documentElement, document.body );
 *
 * switch ( position ) {
 *
 *      //0
 *      case UE.dom.domUtils.POSITION_IDENTICAL:
 *          console.log('元素相同');
 *          break;
 *      //1
 *      case UE.dom.domUtils.POSITION_DISCONNECTED:
 *          console.log('两个节点在不同的文档中');
 *          break;
 *      //2
 *      case UE.dom.domUtils.POSITION_FOLLOWING:
 *          console.log('节点A在节点B之后');
 *          break;
 *      //4
 *      case UE.dom.domUtils.POSITION_PRECEDING;
 *          console.log('节点A在节点B之前');
 *          break;
 *      //8
 *      case UE.dom.domUtils.POSITION_IS_CONTAINED:
 *          console.log('节点A被节点B包含');
 *          break;
 *      case 10:
 *          console.log('节点A被节点B包含且节点A在节点B之后');
 *          break;
 *      //16
 *      case UE.dom.domUtils.POSITION_CONTAINS:
 *          console.log('节点A包含节点B');
 *          break;
 *      case 20:
 *          console.log('节点A包含节点B且节点A在节点B之前');
 *          break;
 *
 * }
 * ```
 */
export default function (nodeA, nodeB) {
  // 如果两个节点是同一个节点
  if (nodeA === nodeB) {
    // domUtils.POSITION_IDENTICAL
    return 0;
  }
  let node,
    parentsA = [nodeA],
    parentsB = [nodeB];
  node = nodeA;
  while ((node = node.parentNode)) {
    // 如果nodeB是nodeA的祖先节点
    if (node === nodeB) {
      // domUtils.POSITION_IS_CONTAINED + domUtils.POSITION_FOLLOWING
      return 10;
    }
    parentsA.push(node);
  }
  node = nodeB;
  while ((node = node.parentNode)) {
    // 如果nodeA是nodeB的祖先节点
    if (node === nodeA) {
      // domUtils.POSITION_CONTAINS + domUtils.POSITION_PRECEDING
      return 20;
    }
    parentsB.push(node);
  }
  parentsA.reverse();
  parentsB.reverse();
  if (parentsA[0] !== parentsB[0]) {
    // domUtils.POSITION_DISCONNECTED
    return 1;
  }
  let i = -1;
  while ((i++, parentsA[i] === parentsB[i])) {}
  nodeA = parentsA[i];
  nodeB = parentsB[i];
  while ((nodeA = nodeA.nextSibling)) {
    if (nodeA === nodeB) {
      // domUtils.POSITION_PRECEDING
      return 4;
    }
  }
  // domUtils.POSITION_FOLLOWING
  return 2;
}
