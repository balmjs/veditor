/**
 * 在当前节点下，根据id查找节点
 * @method getNodeById
 * @param { String } id 要查找的id
 * @return { UE.uNode } 返回找到的节点
 * @example
 * ```javascript
 * node.getNodeById('textId');
 * ```
 */
const getNodeById = function (id) {
  let node;
  if (this.children && this.children.length) {
    for (let i = 0, ci; (ci = this.children[i++]); ) {
      if ((node = getNodeById(ci, id))) {
        return node;
      }
    }
  }
};

export default getNodeById;
