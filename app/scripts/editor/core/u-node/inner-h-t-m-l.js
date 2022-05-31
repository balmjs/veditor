import utils from '../utils';
import dtd from '../dtd';

import htmlparser from '../htmlparser';
/**
 * 获取节点的html内容
 * @method innerHTML
 * @warning 假如节点的type不是'element'，或节点的标签名称不在dtd列表里，直接返回当前节点
 * @return { String } 返回节点的html内容
 * @example
 * ```javascript
 * var htmlstr = node.innerHTML();
 * ```
 */

/**
 * 设置节点的html内容
 * @method innerHTML
 * @warning 假如节点的type不是'element'，或节点的标签名称不在dtd列表里，直接返回当前节点
 * @param { String } htmlstr 传入要设置的html内容
 * @return { UE.uNode } 返回节点本身
 * @example
 * ```javascript
 * node.innerHTML('<span>text</span>');
 * ```
 */
export default function innerHTML(htmlstr) {
  if (this.type != 'element' || dtd.$empty[this.tagName]) {
    return this;
  }
  if (utils.isString(htmlstr)) {
    if (this.children) {
      for (let i = 0, ci; (ci = this.children[i++]); ) {
        ci.parentNode = null;
      }
    }
    this.children = [];
    let tmpRoot = htmlparser(htmlstr);
    for (let i = 0, ci; (ci = tmpRoot.children[i++]); ) {
      this.children.push(ci);
      ci.parentNode = this;
    }
    return this;
  } else {
    let tmpRoot = new uNode({
      type: 'root',
      children: this.children
    });
    return tmpRoot.toHtml();
  }
}
