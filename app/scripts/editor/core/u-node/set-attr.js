import utils from '../utils';

/**
 * 设置当前节点所代表的元素属性，即设置attrs对象下的属性值
 * @method setAttr
 * @param { String } attrName 要设置的属性名称
 * @param { * } attrVal 要设置的属性值，类型视设置的属性而定
 * @return { * } 返回attrs对象下的属性值
 * @example
 * ```javascript
 * node.setAttr('title','标题');
 * ```
 */
export default function setAttr(attrName, attrVal) {
  if (!attrName) {
    delete this.attrs;
    return;
  }
  if (!this.attrs) {
    this.attrs = {};
  }
  if (utils.isObject(attrName)) {
    for (let a in attrName) {
      if (!attrName[a]) {
        delete this.attrs[a];
      } else {
        this.attrs[a.toLowerCase()] = attrName[a];
      }
    }
  } else {
    if (!attrVal) {
      delete this.attrs[attrName];
    } else {
      this.attrs[attrName.toLowerCase()] = attrVal;
    }
  }
}
