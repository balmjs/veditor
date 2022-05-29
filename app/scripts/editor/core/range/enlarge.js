import domUtils from '../dom-utils';

/**
 * 调整range的边界，使其"放大"到最近的父节点
 * @method  enlarge
 * @remind 会引起选区的变化
 * @return { UE.dom.Range } 当前range对象
 */

/**
 * 调整range的边界，使其"放大"到最近的父节点，根据参数 toBlock 的取值， 可以
 * 要求扩大之后的父节点是block节点
 * @method  enlarge
 * @param { Boolean } toBlock 是否要求扩大之后的父节点必须是block节点
 * @return { UE.dom.Range } 当前range对象
 */
export default function (toBlock, stopFn) {
  let isBody = domUtils.isBody,
    pre,
    node,
    tmp = this.document.createTextNode('');
  if (toBlock) {
    node = this.startContainer;
    if (node.nodeType == 1) {
      if (node.childNodes[this.startOffset]) {
        pre = node = node.childNodes[this.startOffset];
      } else {
        node.appendChild(tmp);
        pre = node = tmp;
      }
    } else {
      pre = node;
    }
    while (1) {
      if (domUtils.isBlockElm(node)) {
        node = pre;
        while ((pre = node.previousSibling) && !domUtils.isBlockElm(pre)) {
          node = pre;
        }
        this.setStartBefore(node);
        break;
      }
      pre = node;
      node = node.parentNode;
    }
    node = this.endContainer;
    if (node.nodeType == 1) {
      if ((pre = node.childNodes[this.endOffset])) {
        node.insertBefore(tmp, pre);
      } else {
        node.appendChild(tmp);
      }
      pre = node = tmp;
    } else {
      pre = node;
    }
    while (1) {
      if (domUtils.isBlockElm(node)) {
        node = pre;
        while ((pre = node.nextSibling) && !domUtils.isBlockElm(pre)) {
          node = pre;
        }
        this.setEndAfter(node);
        break;
      }
      pre = node;
      node = node.parentNode;
    }
    if (tmp.parentNode === this.endContainer) {
      this.endOffset--;
    }
    domUtils.remove(tmp);
  }

  // 扩展边界到最大
  if (!this.collapsed) {
    while (this.startOffset == 0) {
      if (stopFn && stopFn(this.startContainer)) {
        break;
      }
      if (isBody(this.startContainer)) {
        break;
      }
      this.setStartBefore(this.startContainer);
    }
    while (
      this.endOffset ==
      (this.endContainer.nodeType == 1
        ? this.endContainer.childNodes.length
        : this.endContainer.nodeValue.length)
    ) {
      if (stopFn && stopFn(this.endContainer)) {
        break;
      }
      if (isBody(this.endContainer)) {
        break;
      }
      this.setEndAfter(this.endContainer);
    }
  }
  return this;
}
