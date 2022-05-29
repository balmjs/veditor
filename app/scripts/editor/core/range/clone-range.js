/**
 * clone当前Range对象
 * @method  cloneRange
 * @remind 返回的range是一个全新的range对象， 其内部所有属性与当前被clone的range相同。
 * @return { UE.dom.Range } 当前range对象的一个副本
 */
export default function () {
  let me = this;
  return new Range(me.document)
    .setStart(me.startContainer, me.startOffset)
    .setEnd(me.endContainer, me.endOffset);
}
