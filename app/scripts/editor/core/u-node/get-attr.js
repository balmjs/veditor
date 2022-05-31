/**
 * 获取当前节点所代表的元素属性，即获取attrs对象下的属性值
 * @method getAttr
 * @param { String } attrName 要获取的属性名称
 * @return { * } 返回attrs对象下的属性值
 * @example
 * ```javascript
 * node.getAttr('title');
 * ```
 */
export default function getAttr(attrName) {
  return this.attrs && this.attrs[attrName.toLowerCase()];
}
