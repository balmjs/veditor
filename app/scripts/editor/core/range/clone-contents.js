import execContentsAction from './exec-contents-action';

/**
 * 克隆选区的内容到一个DocumentFragment里
 * @method cloneContents
 * @return { DocumentFragment | NULL } 如果选区是闭合的将返回null， 否则， 返回包含所clone内容的DocumentFragment元素
 * @example
 * ```html
 * <body>
 *      <!-- 中括号表示选区 -->
 *      <b>x<i>x[x</i>xx]x</b>
 *
 *      <script>
 *          //range是已选中的选区
 *          var fragment = range.cloneContents(),
 *              node = document.createElement("div");
 *
 *          node.appendChild( fragment );
 *
 *          //output: <i>x</i>xx
 *          console.log( node.innerHTML );
 *
 *      </script>
 * </body>
 * ```
 */
export default function () {
  return this.collapsed ? null : execContentsAction(this, 0);
}
