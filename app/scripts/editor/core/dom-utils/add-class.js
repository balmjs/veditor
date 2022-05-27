import utils from '../utils';

/**
 * 给元素element添加className
 * @method addClass
 * @param { Node } ele 需要增加className的元素
 * @param { String } classNames 需要添加的className， 多个className之间以空格分割
 * @remind 相同的类名不会被重复添加
 * @example
 * ```html
 * <span id="test" class="cls1 cls2"></span>
 *
 * <script>
 *     var testNode = document.getElementById("test");
 *
 *     UE.dom.domUtils.addClass( testNode, "cls2 cls3 cls4" );
 *
 *     //output: cl1 cls2 cls3 cls4
 *     console.log( testNode.className );
 *
 * <script>
 * ```
 */

/**
 * 给元素element添加className
 * @method addClass
 * @param { Node } ele 需要增加className的元素
 * @param { Array } classNames 需要添加的className的数组
 * @remind 相同的类名不会被重复添加
 * @example
 * ```html
 * <span id="test" class="cls1 cls2"></span>
 *
 * <script>
 *     var testNode = document.getElementById("test");
 *
 *     UE.dom.domUtils.addClass( testNode, ["cls2", "cls3", "cls4"] );
 *
 *     //output: cl1 cls2 cls3 cls4
 *     console.log( testNode.className );
 *
 * <script>
 * ```
 */
export default function (elm, classNames) {
  if (!elm) return;
  classNames = utils
    .trim(classNames)
    .replace(/[ ]{2,}/g, ' ')
    .split(' ');
  for (var i = 0, ci, cls = elm.className; (ci = classNames[i++]); ) {
    if (!new RegExp('\\b' + ci + '\\b').test(cls)) {
      cls += ' ' + ci;
    }
  }
  elm.className = utils.trim(cls);
}
