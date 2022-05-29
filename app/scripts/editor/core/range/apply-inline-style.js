import domUtils from '../dom-utils';
import dtd from '../dtd';

/**
 * 给range选区中的内容添加给定的inline标签
 * @method applyInlineStyle
 * @param { String } tagName 需要添加的标签名
 * @example
 * ```html
 * <p>xxxx[xxxx]x</p>  ==>  range.applyInlineStyle("strong")  ==>  <p>xxxx[<strong>xxxx</strong>]x</p>
 * ```
 */

/**
 * 给range选区中的内容添加给定的inline标签， 并且为标签附加上一些初始化属性。
 * @method applyInlineStyle
 * @param { String } tagName 需要添加的标签名
 * @param { Object } attrs 跟随新添加的标签的属性
 * @return { UE.dom.Range } 当前选区
 * @example
 * ```html
 * <p>xxxx[xxxx]x</p>
 *
 * ==>
 *
 * <!-- 执行操作 -->
 * range.applyInlineStyle("strong",{"style":"font-size:12px"})
 *
 * ==>
 *
 * <p>xxxx[<strong style="font-size:12px">xxxx</strong>]x</p>
 * ```
 */
export default function (tagName, attrs, list) {
  if (this.collapsed) return this;
  this.trimBoundary()
    .enlarge(false, function (node) {
      return node.nodeType == 1 && domUtils.isBlockElm(node);
    })
    .adjustmentBoundary();
  let bookmark = this.createBookmark(),
    end = bookmark.end,
    filterFn = function (node) {
      return node.nodeType == 1
        ? node.tagName.toLowerCase() != 'br'
        : !domUtils.isWhitespace(node);
    },
    current = domUtils.getNextDomNode(bookmark.start, false, filterFn),
    node,
    pre,
    range = this.cloneRange();
  while (
    current &&
    domUtils.getPosition(current, end) & domUtils.POSITION_PRECEDING
  ) {
    if (current.nodeType == 3 || dtd[tagName][current.tagName]) {
      range.setStartBefore(current);
      node = current;
      while (
        node &&
        (node.nodeType == 3 || dtd[tagName][node.tagName]) &&
        node !== end
      ) {
        pre = node;
        node = domUtils.getNextDomNode(
          node,
          node.nodeType == 1,
          null,
          function (parent) {
            return dtd[tagName][parent.tagName];
          }
        );
      }
      let frag = range.setEndAfter(pre).extractContents(),
        elm;
      if (list && list.length > 0) {
        let level, top;
        top = level = list[0].cloneNode(false);
        for (let i = 1, ci; (ci = list[i++]); ) {
          level.appendChild(ci.cloneNode(false));
          level = level.firstChild;
        }
        elm = level;
      } else {
        elm = range.document.createElement(tagName);
      }
      if (attrs) {
        domUtils.setAttributes(elm, attrs);
      }
      elm.appendChild(frag);
      range.insertNode(list ? top : elm);
      //处理下滑线在a上的情况
      var aNode;
      if (
        tagName == 'span' &&
        attrs.style &&
        /text\-decoration/.test(attrs.style) &&
        (aNode = domUtils.findParentByTagName(elm, 'a', true))
      ) {
        domUtils.setAttributes(aNode, attrs);
        domUtils.remove(elm, true);
        elm = aNode;
      } else {
        domUtils.mergeSibling(elm);
        domUtils.clearEmptySibling(elm);
      }
      //去除子节点相同的
      domUtils.mergeChild(elm, attrs);
      current = domUtils.getNextDomNode(elm, false, filterFn);
      domUtils.mergeToParent(elm);
      if (node === end) {
        break;
      }
    } else {
      current = domUtils.getNextDomNode(current, true, filterFn);
    }
  }
  return this.moveToBookmark(bookmark);
}
