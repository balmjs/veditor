/**
 * 闭合选区到当前选区的开始位置， 并且定位光标到闭合后的位置
 * @method  setCursor
 * @return { UE.dom.Range } 当前range对象
 * @see UE.dom.Range:collapse()
 */

/**
 * 闭合选区，可以根据参数toEnd的值控制选区是向前闭合还是向后闭合， 并且定位光标到闭合后的位置。
 * @method  setCursor
 * @param { Boolean } toEnd 是否向后闭合， 如果为true， 则闭合选区时， 将向结束容器方向闭合，
 *                      反之，则向开始容器方向闭合
 * @return { UE.dom.Range } 当前range对象
 * @see UE.dom.Range:collapse(Boolean)
 */
export default function (toEnd, noFillData) {
  return this.collapse(!toEnd).select(noFillData);
}
