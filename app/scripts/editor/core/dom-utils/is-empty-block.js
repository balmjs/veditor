import browser from '../browser';
import dtd from '../dtd';

/**
 * 判断给定的元素是否是一个空元素
 * @method isEmptyBlock
 * @param { Element } node 需要判断的元素
 * @return { Boolean } 是否是空元素
 * @example
 * ```html
 * <div id="test"></div>
 *
 * <script>
 *     //output: true
 *     console.log( UE.dom.domUtils.isEmptyBlock( document.getElementById("test") ) );
 * </script>
 * ```
 */

/**
 * 根据指定的判断规则判断给定的元素是否是一个空元素
 * @method isEmptyBlock
 * @param { Element } node 需要判断的元素
 * @param { RegExp } reg 对内容执行判断的正则表达式对象
 * @return { Boolean } 是否是空元素
 */
export default function (node, reg) {
  if (node.nodeType != 1) return 0;
  reg = reg || new RegExp('[ \xa0\t\r\n' + domUtils.fillChar + ']', 'g');

  if (
    node[browser.ie ? 'innerText' : 'textContent'].replace(reg, '').length > 0
  ) {
    return 0;
  }
  for (let n in dtd.$isNotEmpty) {
    if (node.getElementsByTagName(n).length) {
      return 0;
    }
  }
  return 1;
}
