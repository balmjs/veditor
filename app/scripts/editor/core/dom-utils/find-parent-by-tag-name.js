import utils from '../utils';
import findParent from './find-parent';

/**
 * 查找node的节点名为tagName的第一个祖先节点， 查找的起点是node节点的父节点。
 * @method findParentByTagName
 * @param { Node } node 需要查找的节点对象
 * @param { Array } tagNames 需要查找的父节点的名称数组
 * @warning 查找的终点是到body节点为止
 * @return { Node | NULL } 如果找到符合条件的节点， 则返回该节点， 否则返回NULL
 * @example
 * ```javascript
 * var node = UE.dom.domUtils.findParentByTagName( document.getElementsByTagName("div")[0], [ "BODY" ] );
 * //output: BODY
 * console.log( node.tagName );
 * ```
 */

/**
 * 查找node的节点名为tagName的祖先节点， 如果includeSelf的值为true，则查找的起点是给定的节点node，
 * 否则， 起点是node的父节点。
 * @method findParentByTagName
 * @param { Node } node 需要查找的节点对象
 * @param { Array } tagNames 需要查找的父节点的名称数组
 * @param { Boolean } includeSelf 查找过程是否包含node节点自身
 * @warning 查找的终点是到body节点为止
 * @return { Node | NULL } 如果找到符合条件的节点， 则返回该节点， 否则返回NULL
 * @example
 * ```javascript
 * var queryTarget = document.getElementsByTagName("div")[0];
 * var node = UE.dom.domUtils.findParentByTagName( queryTarget, [ "DIV" ], true );
 * //output: true
 * console.log( queryTarget === node );
 * ```
 */
export default function (node, tagNames, includeSelf, excludeFn) {
  tagNames = utils.listToMap(utils.isArray(tagNames) ? tagNames : [tagNames]);
  return findParent(
    node,
    function (node) {
      return tagNames[node.tagName] && !(excludeFn && excludeFn(node));
    },
    includeSelf
  );
}
