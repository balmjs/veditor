/**
 * 获取离nodeA与nodeB最近的公共的祖先节点
 * @method  getCommonAncestor
 * @param { Node } nodeA 第一个节点
 * @param { Node } nodeB 第二个节点
 * @remind 如果给定的两个节点是同一个节点， 将直接返回该节点。
 * @return { Node | NULL } 如果未找到公共节点， 返回NULL， 否则返回最近的公共祖先节点。
 * @example
 * ```javascript
 * var commonAncestor = UE.dom.domUtils.getCommonAncestor( document.body, document.body.firstChild );
 * //output: true
 * console.log( commonAncestor.tagName.toLowerCase() === 'body' );
 * ```
 */
export default function (nodeA, nodeB) {
  if (nodeA === nodeB) return nodeA;
  let parentsA = [nodeA],
    parentsB = [nodeB],
    parent = nodeA,
    i = -1;
  while ((parent = parent.parentNode)) {
    if (parent === nodeB) {
      return parent;
    }
    parentsA.push(parent);
  }
  parent = nodeB;
  while ((parent = parent.parentNode)) {
    if (parent === nodeA) return parent;
    parentsB.push(parent);
  }
  parentsA.reverse();
  parentsB.reverse();
  while ((i++, parentsA[i] === parentsB[i])) {}
  return i == 0 ? null : parentsA[i - 1];
}
