import browser from '../browser';
import domUtils from '../dom-utils';

import removeFillData from './remove-fill-data';
import mergeSibling from './merge-sibling';

import fillData from './fill-data';

/**
 * 在页面上高亮range所表示的选区
 * @method select
 * @return { UE.dom.Range } 返回当前Range对象
 */
//这里不区分ie9以上，trace:3824

const handler4Ie = function (noFillData, textRange) {
  let nativeRange;
  if (!this.collapsed) this.shrinkBoundary();
  let node = this.getClosedNode();
  if (node && !textRange) {
    try {
      nativeRange = this.document.body.createControlRange();
      nativeRange.addElement(node);
      nativeRange.select();
    } catch (e) {}
    return this;
  }
  var bookmark = this.createBookmark(),
    start = bookmark.start,
    end;
  nativeRange = this.document.body.createTextRange();
  nativeRange.moveToElementText(start);
  nativeRange.moveStart('character', 1);
  if (!this.collapsed) {
    let nativeRangeEnd = this.document.body.createTextRange();
    end = bookmark.end;
    nativeRangeEnd.moveToElementText(end);
    nativeRange.setEndPoint('EndToEnd', nativeRangeEnd);
  } else {
    if (!noFillData && this.startContainer.nodeType != 3) {
      //使用<span>|x<span>固定住光标
      var tmpText = this.document.createTextNode(fillChar),
        tmp = this.document.createElement('span');
      tmp.appendChild(this.document.createTextNode(fillChar));
      start.parentNode.insertBefore(tmp, start);
      start.parentNode.insertBefore(tmpText, start);
      //当点b,i,u时，不能清除i上边的b
      removeFillData(this.document, tmpText);
      fillData = tmpText;
      mergeSibling(tmp, 'previousSibling');
      mergeSibling(start, 'nextSibling');
      nativeRange.moveStart('character', -1);
      nativeRange.collapse(true);
    }
  }
  this.moveToBookmark(bookmark);
  tmp && domUtils.remove(tmp);
  //IE在隐藏状态下不支持range操作，catch一下
  try {
    nativeRange.select();
  } catch (e) {}
  return this;
};

const handler = function (notInsertFillData) {
  function checkOffset(rng) {
    function check(node, offset, dir) {
      if (node.nodeType == 3 && node.nodeValue.length < offset) {
        rng[dir + 'Offset'] = node.nodeValue.length;
      }
    }
    check(rng.startContainer, rng.startOffset, 'start');
    check(rng.endContainer, rng.endOffset, 'end');
  }
  let win = domUtils.getWindow(this.document),
    sel = win.getSelection(),
    txtNode;
  //FF下关闭自动长高时滚动条在关闭dialog时会跳
  //ff下如果不body.focus将不能定位闭合光标到编辑器内
  browser.gecko ? this.document.body.focus() : win.focus();
  if (sel) {
    sel.removeAllRanges();
    // trace:870 chrome/safari后边是br对于闭合得range不能定位 所以去掉了判断
    // this.startContainer.nodeType != 3 &&! ((child = this.startContainer.childNodes[this.startOffset]) && child.nodeType == 1 && child.tagName == 'BR'
    if (this.collapsed && !notInsertFillData) {
      //                    //opear如果没有节点接着，原生的不能够定位,不能在body的第一级插入空白节点
      //                    if (notInsertFillData && browser.opera && !domUtils.isBody(this.startContainer) && this.startContainer.nodeType == 1) {
      //                        var tmp = this.document.createTextNode('');
      //                        this.insertNode(tmp).setStart(tmp, 0).collapse(true);
      //                    }
      //
      //处理光标落在文本节点的情况
      //处理以下的情况
      //<b>|xxxx</b>
      //<b>xxxx</b>|xxxx
      //xxxx<b>|</b>
      var start = this.startContainer,
        child = start;
      if (start.nodeType == 1) {
        child = start.childNodes[this.startOffset];
      }
      if (
        !(start.nodeType == 3 && this.startOffset) &&
        (child
          ? !child.previousSibling || child.previousSibling.nodeType != 3
          : !start.lastChild || start.lastChild.nodeType != 3)
      ) {
        txtNode = this.document.createTextNode(fillChar);
        //跟着前边走
        this.insertNode(txtNode);
        removeFillData(this.document, txtNode);
        mergeSibling(txtNode, 'previousSibling');
        mergeSibling(txtNode, 'nextSibling');
        fillData = txtNode;
        this.setStart(txtNode, browser.webkit ? 1 : 0).collapse(true);
      }
    }
    let nativeRange = this.document.createRange();
    if (this.collapsed && browser.opera && this.startContainer.nodeType == 1) {
      let child = this.startContainer.childNodes[this.startOffset];
      if (!child) {
        //往前靠拢
        child = this.startContainer.lastChild;
        if (child && domUtils.isBr(child)) {
          this.setStartBefore(child).collapse(true);
        }
      } else {
        //向后靠拢
        while (child && domUtils.isBlockElm(child)) {
          if (child.nodeType == 1 && child.childNodes[0]) {
            child = child.childNodes[0];
          } else {
            break;
          }
        }
        child && this.setStartBefore(child).collapse(true);
      }
    }
    //是createAddress最后一位算的不准，现在这里进行微调
    checkOffset(this);
    nativeRange.setStart(this.startContainer, this.startOffset);
    nativeRange.setEnd(this.endContainer, this.endOffset);
    sel.addRange(nativeRange);
  }
  return this;
};

export default browser.ie ? handler4Ie : handler;
