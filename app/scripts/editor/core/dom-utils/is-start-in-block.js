import isFillChar from './is-fill-char';
import isEmptyNode from './is-empty-node';
import isBlockElm from './is-block-elm';
import isBody from './is-body';

export default function (range) {
  let tmpRange = range.cloneRange(),
    flag = 0,
    start = tmpRange.startContainer,
    tmp;
  if (start.nodeType == 1 && start.childNodes[tmpRange.startOffset]) {
    start = start.childNodes[tmpRange.startOffset];
    let pre = start.previousSibling;
    while (pre && isFillChar(pre)) {
      start = pre;
      pre = pre.previousSibling;
    }
  }
  if (isFillChar(start, true) && tmpRange.startOffset == 1) {
    tmpRange.setStartBefore(start);
    start = tmpRange.startContainer;
  }

  while (start && isFillChar(start)) {
    tmp = start;
    start = start.previousSibling;
  }
  if (tmp) {
    tmpRange.setStartBefore(tmp);
    start = tmpRange.startContainer;
  }
  if (start.nodeType == 1 && isEmptyNode(start) && tmpRange.startOffset == 1) {
    tmpRange.setStart(start, 0).collapse(true);
  }
  while (!tmpRange.startOffset) {
    start = tmpRange.startContainer;
    if (isBlockElm(start) || isBody(start)) {
      flag = 1;
      break;
    }
    let pre = tmpRange.startContainer.previousSibling,
      tmpNode;
    if (!pre) {
      tmpRange.setStartBefore(tmpRange.startContainer);
    } else {
      while (pre && isFillChar(pre)) {
        tmpNode = pre;
        pre = pre.previousSibling;
      }
      if (tmpNode) {
        tmpRange.setStartBefore(tmpNode);
      } else {
        tmpRange.setStartBefore(tmpRange.startContainer);
      }
    }
  }
  return flag && !isBody(tmpRange.startContainer) ? 1 : 0;
}
