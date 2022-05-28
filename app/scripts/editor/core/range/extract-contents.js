import execContentsAction from './exec-contents-action';

/**
 * 将当前选区的内容提取到一个DocumentFragment里
 * @method extractContents
 * @remind 执行该操作后， 选区将变成闭合状态
 * @warning 执行该操作后， 原来选区所选中的内容将从dom树上剥离出来
 * @return { DocumentFragment } 返回包含所提取内容的DocumentFragment对象
 * @example
 * ```html
 * <body>
 *      <!-- 中括号表示选区 -->
 *      <b>x<i>x[x</i>xx]x</b>
 *
 *      <script>
 *          //range是已选中的选区
 *          var fragment = range.extractContents(),
 *              node = document.createElement( "div" );
 *
 *          node.appendChild( fragment );
 *
 *          //竖线表示闭合后的选区位置
 *
 *          //output: <b>x<i>x</i>|x</b>
 *          console.log( document.body.innerHTML );
 *          //output: <i>x</i>xx
 *          console.log( node.innerHTML );
 *
 *          //此时， range的各项属性为
 *          //output: B
 *          console.log( range.startContainer.tagName );
 *          //output: 2
 *          console.log( range.startOffset );
 *          //output: B
 *          console.log( range.endContainer.tagName );
 *          //output: 2
 *          console.log( range.endOffset );
 *          //output: true
 *          console.log( range.collapsed );
 *
 *      </script>
 * </body>
 */
export default function () {
  return this.collapsed ? null : execContentsAction(this, 2);
}
