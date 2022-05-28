import execContentsAction from './exec-contents-action';
import domUtils from '../dom-utils';
import browser from '../browser';

/**
 * 删除当前选区范围中的所有内容
 * @method deleteContents
 * @remind 执行完该操作后， 当前Range对象变成了闭合状态
 * @return { UE.dom.Range } 当前操作的Range对象
 * @example
 * ```html
 * <body>
 *      <!-- 中括号表示选区 -->
 *      <b>x<i>x[x</i>xx]x</b>
 *
 *      <script>
 *          //range是已选中的选区
 *          range.deleteContents();
 *
 *          //竖线表示闭合后的选区位置
 *          //output: <b>x<i>x</i>|x</b>
 *          console.log( document.body.innerHTML );
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
 * ```
 */
export default function () {
  let txt;
  if (!this.collapsed) {
    execContentsAction(this, 1);
  }
  if (browser.webkit) {
    txt = this.startContainer;
    if (txt.nodeType == 3 && !txt.nodeValue.length) {
      this.setStartBefore(txt).collapse(true);
      domUtils.remove(txt);
    }
  }
  return this;
}
