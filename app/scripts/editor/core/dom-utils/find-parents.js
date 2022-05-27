import findParent from './find-parent';

/**
 * 查找节点node的祖先节点集合， 查找的起点是给定节点的父节点，结果集中不包含给定的节点。
 * @method findParents
 * @param { Node } node 需要查找的节点对象
 * @return { Array } 给定节点的祖先节点数组
 * @grammar UE.dom.domUtils.findParents(node)  => Array  //返回一个祖先节点数组集合，不包含自身
 * @grammar UE.dom.domUtils.findParents(node,includeSelf)  => Array  //返回一个祖先节点数组集合，includeSelf指定是否包含自身
 * @grammar UE.dom.domUtils.findParents(node,includeSelf,filterFn)  => Array  //返回一个祖先节点数组集合，filterFn指定过滤条件，返回true的node将被选取
 * @grammar UE.dom.domUtils.findParents(node,includeSelf,filterFn,closerFirst)  => Array  //返回一个祖先节点数组集合，closerFirst为true的话，node的直接父亲节点是数组的第0个
 */

/**
 * 查找节点node的祖先节点集合， 如果includeSelf的值为true，
 * 则返回的结果集中允许出现当前给定的节点， 否则， 该节点不会出现在其结果集中。
 * @method findParents
 * @param { Node } node 需要查找的节点对象
 * @param { Boolean } includeSelf 查找的结果中是否允许包含当前查找的节点对象
 * @return { Array } 给定节点的祖先节点数组
 */
export default function (node, includeSelf, filterFn, closerFirst) {
  let parents =
    includeSelf && ((filterFn && filterFn(node)) || !filterFn) ? [node] : [];
  while ((node = findParent(node, filterFn))) {
    parents.push(node);
  }
  return closerFirst ? parents : parents.reverse();
}
