import domUtils from '../dom-utils';

/**
 * 调整Range的边界，使其"缩小"到最合适的位置
 * @method adjustmentBoundary
 * @return { UE.dom.Range } 当前range对象
 * @see UE.dom.Range:shrinkBoundary()
 */

export default function () {
  if (!this.collapsed) {
    while (
      !domUtils.isBody(this.startContainer) &&
      this.startOffset ==
        this.startContainer[
          this.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'
        ].length &&
      this.startContainer[
        this.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'
      ].length
    ) {
      this.setStartAfter(this.startContainer);
    }
    while (
      !domUtils.isBody(this.endContainer) &&
      !this.endOffset &&
      this.endContainer[
        this.endContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'
      ].length
    ) {
      this.setEndBefore(this.endContainer);
    }
  }
  return this;
}
