import domUtils from '../dom-utils';

/**
 * 滚动到当前range开始的位置
 * @method scrollToView
 * @param { Window } win 当前range对象所属的window对象
 * @return { UE.dom.Range } 当前Range对象
 */

/**
 * 滚动到距离当前range开始位置 offset 的位置处
 * @method scrollToView
 * @param { Window } win 当前range对象所属的window对象
 * @param { Number } offset 距离range开始位置处的偏移量， 如果为正数， 则向下偏移， 反之， 则向上偏移
 * @return { UE.dom.Range } 当前Range对象
 */

export default function (win, offset) {
  win = win ? window : domUtils.getWindow(this.document);
  let me = this,
    span = me.document.createElement('span');
  //trace:717
  span.innerHTML = '&nbsp;';
  me.cloneRange().insertNode(span);
  domUtils.scrollToView(span, win, offset);
  domUtils.remove(span);
  return me;
}
