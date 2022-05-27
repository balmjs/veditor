import browser from '../browser';
import dtd from '../dtd';
import utils from '../utils';
import getStyle from './get-style';
import getWindow from './get-window';

/**
 * 获取元素element经过计算后的样式值
 * @method getComputedStyle
 * @param { Element } element 需要获取样式的元素对象
 * @param { String } styleName 需要获取的样式名
 * @return { String } 获取到的样式值
 * @example
 * ```html
 * <style type="text/css">
 *      #test {
 *          font-size: 15px;
 *      }
 * </style>
 *
 * <span id="test"></span>
 *
 * <script>
 *     //output: 15px
 *     console.log( UE.dom.domUtils.getComputedStyle( document.getElementById( "test" ), 'font-size' ) );
 * </script>
 * ```
 */
export default function (element, styleName) {
  //一下的属性单独处理
  let pros = 'width height top left';
  let value;

  if (pros.indexOf(styleName) > -1) {
    return (
      element[
        'offset' +
          styleName.replace(/^\w/, function (s) {
            return s.toUpperCase();
          })
      ] + 'px'
    );
  }
  //忽略文本节点
  if (element.nodeType == 3) {
    element = element.parentNode;
  }
  //ie下font-size若body下定义了font-size，则从currentStyle里会取到这个font-size. 取不到实际值，故此修改.
  if (
    browser.ie &&
    browser.version < 9 &&
    styleName == 'font-size' &&
    !element.style.fontSize &&
    !dtd.$empty[element.tagName] &&
    !dtd.$nonChild[element.tagName]
  ) {
    let span = element.ownerDocument.createElement('span');
    span.style.cssText = 'padding:0;border:0;font-family:simsun;';
    span.innerHTML = '.';
    element.appendChild(span);
    let result = span.offsetHeight;
    element.removeChild(span);
    span = null;
    return result + 'px';
  }
  try {
    value =
      getStyle(element, styleName) ||
      (window.getComputedStyle
        ? getWindow(element)
            .getComputedStyle(element, '')
            .getPropertyValue(styleName)
        : (element.currentStyle || element.style)[
            utils.cssStyleToDomStyle(styleName)
          ]);
  } catch (e) {
    return '';
  }
  return utils.transUnitToPx(utils.fixColor(styleName, value));
}
