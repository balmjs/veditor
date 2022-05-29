import domUtils from '../dom-utils';

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
 *         //output: {startAddress:[0,1,0,0],endAddress:[0,1,0,4]}
 *         console.log( range.createAddress() );
 *     </script>
 * </body>
 * ```
 */

export default function (ignoreEnd, ignoreTxt) {
  let addr = {},
    me = this;

  function getAddress(isStart) {
    let node = isStart ? me.startContainer : me.endContainer;
    let parents = domUtils.findParents(node, true, function (node) {
        return !domUtils.isBody(node);
      }),
      addrs = [];
    for (let i = 0, ci; (ci = parents[i++]); ) {
      addrs.push(domUtils.getNodeIndex(ci, ignoreTxt));
    }
    let firstIndex = 0;

    if (ignoreTxt) {
      if (node.nodeType == 3) {
        let tmpNode = node.previousSibling;
        while (tmpNode && tmpNode.nodeType == 3) {
          firstIndex += tmpNode.nodeValue.replace(fillCharReg, '').length;
          tmpNode = tmpNode.previousSibling;
        }
        firstIndex += isStart ? me.startOffset : me.endOffset; // - (fillCharReg.test(node.nodeValue) ? 1 : 0 )
      } else {
        node = node.childNodes[isStart ? me.startOffset : me.endOffset];
        if (node) {
          firstIndex = domUtils.getNodeIndex(node, ignoreTxt);
        } else {
          node = isStart ? me.startContainer : me.endContainer;
          let first = node.firstChild;
          while (first) {
            if (domUtils.isFillChar(first)) {
              first = first.nextSibling;
              continue;
            }
            firstIndex++;
            if (first.nodeType == 3) {
              while (first && first.nodeType == 3) {
                first = first.nextSibling;
              }
            } else {
              first = first.nextSibling;
            }
          }
        }
      }
    } else {
      firstIndex = isStart
        ? domUtils.isFillChar(node)
          ? 0
          : me.startOffset
        : me.endOffset;
    }
    if (firstIndex < 0) {
      firstIndex = 0;
    }
    addrs.push(firstIndex);
    return addrs;
  }
  addr.startAddress = getAddress(true);
  if (!ignoreEnd) {
    addr.endAddress = me.collapsed
      ? [].concat(addr.startAddress)
      : getAddress();
  }
  return addr;
}
