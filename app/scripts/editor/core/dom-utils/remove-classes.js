import utils from '../utils';
import removeAttributes from './remove-attributes';

/**
 * 删除元素element指定的className
 * @method removeClasses
 * @param { Element } ele 需要删除class的元素节点
 * @param { String } classNames 需要删除的className， 多个className之间以空格分开
 * @example
 * ```html
 * <span id="test" class="test1 test2 test3">xxx</span>
 *
 * <script>
 *
 *     var testNode = document.getElementById( "test" );
 *     UE.dom.domUtils.removeClasses( testNode, "test1 test2" );
 *
 *     //output: test3
 *     console.log( testNode.className );
 *
 * </script>
 * ```
 */

/**
 * 删除元素element指定的className
 * @method removeClasses
 * @param { Element } ele 需要删除class的元素节点
 * @param { Array } classNames 需要删除的className数组
 * @example
 * ```html
 * <span id="test" class="test1 test2 test3">xxx</span>
 *
 * <script>
 *
 *     var testNode = document.getElementById( "test" );
 *     UE.dom.domUtils.removeClasses( testNode, ["test1", "test2"] );
 *
 *     //output: test3
 *     console.log( testNode.className );
 *
 * </script>
 * ```
 */
export default function (elm, classNames) {
  classNames = utils.isArray(classNames)
    ? classNames
    : utils
        .trim(classNames)
        .replace(/[ ]{2,}/g, ' ')
        .split(' ');
  for (let i = 0, ci, cls = elm.className; (ci = classNames[i++]); ) {
    cls = cls.replace(new RegExp('\\b' + ci + '\\b'), '');
  }
  cls = utils.trim(cls).replace(/[ ]{2,}/g, ' ');
  if (cls) {
    elm.className = cls;
  } else {
    removeAttributes(elm, ['class']);
  }
}
