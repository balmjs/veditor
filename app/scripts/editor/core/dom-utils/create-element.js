import setAttributes from './set-attributes';
/**
 * 在doc下创建一个标签名为tag，属性为attrs的元素
 * @method createElement
 * @param { DomDocument } doc 新创建的元素属于该document节点创建
 * @param { String } tagName 需要创建的元素的标签名
 * @param { Object } attrs 新创建的元素的属性key-value集合
 * @return { Element } 新创建的元素对象
 * @example
 * ```javascript
 * var ele = UE.dom.domUtils.createElement( document, 'div', {
 *     id: 'test'
 * } );
 *
 * //output: DIV
 * console.log( ele.tagName );
 *
 * //output: test
 * console.log( ele.id );
 *
 * ```
 */

export default function (doc, tag, attrs) {
  return setAttributes(doc.createElement(tag), attrs);
}
