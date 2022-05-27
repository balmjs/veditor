import utils from '../utils';
import hasClass from './has-class';
/**
 * 原生方法getElementsByTagName的封装
 * @method getElementsByTagName
 * @param { Node } node 目标节点对象
 * @param { String } tagName 需要查找的节点的tagName， 多个tagName以空格分割
 * @return { Array } 符合条件的节点集合
 */
export default function (node, name, filter) {
  if (filter && utils.isString(filter)) {
    let className = filter;
    filter = function (node) {
      return hasClass(node, className);
    };
  }
  name = utils
    .trim(name)
    .replace(/[ ]{2,}/g, ' ')
    .split(' ');
  let arr = [];
  for (let n = 0, ni; (ni = name[n++]); ) {
    let list = node.getElementsByTagName(ni);
    for (let i = 0, ci; (ci = list[i++]); ) {
      if (!filter || filter(ci)) arr.push(ci);
    }
  }

  return arr;
}
