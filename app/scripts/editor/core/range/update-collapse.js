/**
 * 更新range的collapse状态
 * @param  {Range}   range    range对象
 */
export default function updateCollapse(range) {
  range.collapsed =
    range.startContainer &&
    range.endContainer &&
    range.startContainer === range.endContainer &&
    range.startOffset == range.endOffset;
}
