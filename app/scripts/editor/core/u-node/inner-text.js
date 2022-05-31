import dtd from '../dtd';
/**
 * 获取节点的纯文本内容
 * @method innerText
 * @warning 假如节点的type不是'element'，或节点的标签名称不在dtd列表里，直接返回当前节点
 * @return { String } 返回节点的存文本内容
 * @example
 * ```javascript
 * var textStr = node.innerText();
 * ```
 */

/**
 * 设置节点的纯文本内容
 * @method innerText
 * @warning 假如节点的type不是'element'，或节点的标签名称不在dtd列表里，直接返回当前节点
 * @param { String } textStr 传入要设置的文本内容
 * @return { UE.uNode } 返回节点本身
 * @example
 * ```javascript
 * node.innerText('<span>text</span>');
 * ```
 */
export default function innerText(textStr, noTrans) {
  if (this.type != 'element' || dtd.$empty[this.tagName]) {
    return this;
  }
  if (textStr) {
    if (this.children) {
      for (let i = 0, ci; (ci = this.children[i++]); ) {
        ci.parentNode = null;
      }
    }
    this.children = [];
    this.appendChild(uNode.createText(textStr, noTrans));
    return this;
  } else {
    return this.toHtml().replace(/<[^>]+>/g, '');
  }
}
