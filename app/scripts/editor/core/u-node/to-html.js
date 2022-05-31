import { nodeToHtml } from './constans';

/**
 * 当前节点对象，转换成html文本
 * @method toHtml
 * @return { String } 返回转换后的html字符串
 * @example
 * ```javascript
 * node.toHtml();
 * ```
 */

/**
 * 当前节点对象，转换成html文本
 * @method toHtml
 * @param { Boolean } formatter 是否格式化返回值
 * @return { String } 返回转换后的html字符串
 * @example
 * ```javascript
 * node.toHtml( true );
 * ```
 */
export default function toHtml(formatter) {
  let arr = [];
  nodeToHtml(this, arr, formatter, 0);
  return arr.join('');
}
