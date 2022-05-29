import utils from '../utils';
import domUtils from '../dom-utils';

/**
 * 移除当前选区内指定的inline标签，但保留其中的内容
 * @method removeInlineStyle
 * @param { String } tagName 需要移除的标签名
 * @return { UE.dom.Range } 当前的range对象
 * @example
 * ```html
 * xx[x<span>xxx<em>yyy</em>zz]z</span>  => range.removeInlineStyle(["em"])  => xx[x<span>xxxyyyzz]z</span>
 * ```
 */

/**
 * 移除当前选区内指定的一组inline标签，但保留其中的内容
 * @method removeInlineStyle
 * @param { Array } tagNameArr 需要移除的标签名的数组
 * @return { UE.dom.Range } 当前的range对象
 * @see UE.dom.Range:removeInlineStyle(String)
 */
export default function (tagNames) {
  if (this.collapsed) return this;
  tagNames = utils.isArray(tagNames) ? tagNames : [tagNames];
  this.shrinkBoundary().adjustmentBoundary();
  let start = this.startContainer,
    end = this.endContainer;
  while (1) {
    if (start.nodeType == 1) {
      if (utils.indexOf(tagNames, start.tagName.toLowerCase()) > -1) {
        break;
      }
      if (start.tagName.toLowerCase() == 'body') {
        start = null;
        break;
      }
    }
    start = start.parentNode;
  }
  while (1) {
    if (end.nodeType == 1) {
      if (utils.indexOf(tagNames, end.tagName.toLowerCase()) > -1) {
        break;
      }
      if (end.tagName.toLowerCase() == 'body') {
        end = null;
        break;
      }
    }
    end = end.parentNode;
  }
  let bookmark = this.createBookmark(),
    frag,
    tmpRange;
  if (start) {
    tmpRange = this.cloneRange()
      .setEndBefore(bookmark.start)
      .setStartBefore(start);
    frag = tmpRange.extractContents();
    tmpRange.insertNode(frag);
    domUtils.clearEmptySibling(start, true);
    start.parentNode.insertBefore(bookmark.start, start);
  }
  if (end) {
    tmpRange = this.cloneRange().setStartAfter(bookmark.end).setEndAfter(end);
    frag = tmpRange.extractContents();
    tmpRange.insertNode(frag);
    domUtils.clearEmptySibling(end, false, true);
    end.parentNode.insertBefore(bookmark.end, end.nextSibling);
  }
  let current = domUtils.getNextDomNode(bookmark.start, false, function (node) {
      return node.nodeType == 1;
    }),
    next;
  while (current && current !== bookmark.end) {
    next = domUtils.getNextDomNode(current, true, function (node) {
      return node.nodeType == 1;
    });
    if (utils.indexOf(tagNames, current.tagName.toLowerCase()) > -1) {
      domUtils.remove(current, true);
    }
    current = next;
  }
  return this.moveToBookmark(bookmark);
}
