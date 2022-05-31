import utils from '../utils';

/**
 * 在当前节点下，根据元素名称查找节点列表
 * @method getNodesByTagName
 * @param { String } tagNames 要查找的元素名称
 * @return { Array } 返回找到的节点列表
 * @example
 * ```javascript
 * node.getNodesByTagName('span');
 * ```
 */
const getNodesByTagName = function (tagNames) {
  tagNames = utils
    .trim(tagNames)
    .replace(/[ ]{2,}/g, ' ')
    .split(' ');
  let arr = [];
  utils.each(tagNames, (tagName) => {
    if (this.children && this.children.length) {
      for (let i = 0, ci; (ci = me.children[i++]); ) {
        getNodesByTagName(ci, tagName, arr);
      }
    }
  });
  return arr;
};

export default getNodesByTagName;
