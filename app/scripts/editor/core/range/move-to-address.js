/**
 * 保存
 * @method createAddress
 * @private
 * @return { Boolean } 返回开始和结束的位置
 * @example
 * ```html
 * <body>
 *     <p>
 *         aaaa
 *         <em>
 *             <!-- 选区开始 -->
 *             bbbb
 *             <!-- 选区结束 -->
 *         </em>
 *     </p>
 *
 *     <script>
 *         var range = editor.selection.getRange();
 *         range.moveToAddress({startAddress:[0,1,0,0],endAddress:[0,1,0,4]});
 *         range.select();
 *         //output: 'bbbb'
 *         console.log(editor.selection.getText());
 *     </script>
 * </body>
 * ```
 */

export default function (addr, ignoreEnd) {
  let me = this;
  function getNode(address, isStart) {
    let tmpNode = me.document.body,
      parentNode,
      offset;
    for (let i = 0, ci, l = address.length; i < l; i++) {
      ci = address[i];
      parentNode = tmpNode;
      tmpNode = tmpNode.childNodes[ci];
      if (!tmpNode) {
        offset = ci;
        break;
      }
    }
    if (isStart) {
      if (tmpNode) {
        me.setStartBefore(tmpNode);
      } else {
        me.setStart(parentNode, offset);
      }
    } else {
      if (tmpNode) {
        me.setEndBefore(tmpNode);
      } else {
        me.setEnd(parentNode, offset);
      }
    }
  }
  getNode(addr.startAddress, true);
  !ignoreEnd && addr.endAddress && getNode(addr.endAddress);
  return me;
}
