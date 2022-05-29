import domUtils from '../dom-utils';

export default function (ignoreEnd) {
  while (!domUtils.isBlockElm(this.startContainer)) {
    this.setStartBefore(this.startContainer);
  }
  if (!ignoreEnd) {
    while (!domUtils.isBlockElm(this.endContainer)) {
      this.setEndAfter(this.endContainer);
    }
  }
  return this;
}
