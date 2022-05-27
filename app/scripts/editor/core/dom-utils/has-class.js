import utils from '../utils';
/**
 * 判断元素element是否包含给定的样式类名className
 * @method hasClass
 * @param { Node } ele 需要检测的元素
 * @param { Array } classNames 需要检测的className数组
 * @return { Boolean } 元素是否包含所有给定的className
 * @example
 * ```html
 * <span id="test1" class="cls1 cls2"></span>
 *
 * <script>
 *     var test1 = document.getElementById("test1");
 *
 *     //output: false
 *     console.log( UE.dom.domUtils.hasClass( test1, [ "cls2", "cls1", "cls3" ] ) );
 *
 *     //output: true
 *     console.log( UE.dom.domUtils.hasClass( test1, [ "cls2", "cls1" ]) );
 * </script>
 * ```
 */

export default function (element, className) {
  if (utils.isRegExp(className)) {
    return className.test(element.className);
  }
  className = utils
    .trim(className)
    .replace(/[ ]{2,}/g, ' ')
    .split(' ');
  for (let i = 0, ci, cls = element.className; (ci = className[i++]); ) {
    if (!new RegExp('\\b' + ci + '\\b', 'i').test(cls)) {
      return false;
    }
  }
  return i - 1 == className.length;
}
