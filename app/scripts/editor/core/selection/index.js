import browser from '../browser';
import domUtils from '../dom-utils';
import _getIERange from './_get-i-e-range';
import transformIERangeToRange from './transform-i-e-range-to-range';

/**
 * 选集
 * @file
 * @module UE.dom
 * @class Selection
 * @since 1.2.6.1
 */

/**
 * 选区集合
 * @unfile
 * @module UE.dom
 * @class Selection
 */
export default class Selection {
  constructor(doc) {
    let iframe;
    this.document = doc;
    if (browser.ie9below) {
      iframe = domUtils.getWindow(doc).frameElement;
      domUtils.on(iframe, 'beforedeactivate', () => {
        this._bakIERange = this.getIERange();
      });
      domUtils.on(iframe, 'activate', () => {
        try {
          if (!_getIERange(this) && this._bakIERange) {
            this._bakIERange.select();
          }
        } catch (ex) {}
        this._bakIERange = null;
      });
    }
    iframe = doc = null;
  }

  rangeInBody(rng, txtRange) {
    let node =
      browser.ie9below || txtRange
        ? rng.item
          ? rng.item()
          : rng.parentElement()
        : rng.startContainer;

    return node === this.document.body || domUtils.inDoc(node, this.document);
  }

  /**
   * 获取原生seleciton对象
   * @method getNative
   * @return { Object } 获得selection对象
   * @example
   * ```javascript
   * editor.selection.getNative();
   * ```
   */
  getNative() {
    let doc = this.document;
    try {
      return !doc
        ? null
        : browser.ie9below
        ? doc.selection
        : domUtils.getWindow(doc).getSelection();
    } catch (e) {
      return null;
    }
  }

  /**
   * 获得ieRange
   * @method getIERange
   * @return { Object } 返回ie原生的Range
   * @example
   * ```javascript
   * editor.selection.getIERange();
   * ```
   */
  getIERange() {
    let ieRange = _getIERange(this);
    if (!ieRange) {
      if (this._bakIERange) {
        return this._bakIERange;
      }
    }
    return ieRange;
  }

  /**
   * 缓存当前选区的range和选区的开始节点
   * @method cache
   */
  cache() {
    this.clear();
    this._cachedRange = this.getRange();
    this._cachedStartElement = this.getStart();
    this._cachedStartElementPath = this.getStartElementPath();
  }

  /**
   * 获取选区开始位置的父节点到body
   * @method getStartElementPath
   * @return { Array } 返回父节点集合
   * @example
   * ```javascript
   * editor.selection.getStartElementPath();
   * ```
   */
  getStartElementPath() {
    if (this._cachedStartElementPath) {
      return this._cachedStartElementPath;
    }
    let start = this.getStart();
    if (start) {
      return domUtils.findParents(start, true, null, true);
    }
    return [];
  }

  /**
   * 清空缓存
   * @method clear
   */
  clear() {
    this._cachedStartElementPath =
      this._cachedRange =
      this._cachedStartElement =
        null;
  }

  /**
   * 编辑器是否得到了选区
   * @method isFocus
   */
  isFocus() {
    try {
      if (browser.ie9below) {
        let nativeRange = _getIERange(this);
        return !!(nativeRange && this.rangeInBody(nativeRange));
      } else {
        return !!this.getNative().rangeCount;
      }
    } catch (e) {
      return false;
    }
  }

  /**
   * 获取选区对应的Range
   * @method getRange
   * @return { Object } 得到Range对象
   * @example
   * ```javascript
   * editor.selection.getRange();
   * ```
   */
  getRange() {
    let me = this;
    function optimze(range) {
      let child = me.document.body.firstChild,
        collapsed = range.collapsed;
      while (child && child.firstChild) {
        range.setStart(child, 0);
        child = child.firstChild;
      }
      if (!range.startContainer) {
        range.setStart(me.document.body, 0);
      }
      if (collapsed) {
        range.collapse(true);
      }
    }

    if (me._cachedRange != null) {
      return this._cachedRange;
    }

    // TODO: 等待转化为新的实例
    let range = new baidu.editor.dom.Range(me.document);

    if (browser.ie9below) {
      let nativeRange = me.getIERange();
      if (nativeRange) {
        //备份的_bakIERange可能已经实效了，dom树发生了变化比如从源码模式切回来，所以try一下，实效就放到body开始位置
        try {
          transformIERangeToRange(nativeRange, range);
        } catch (e) {
          optimze(range);
        }
      } else {
        optimze(range);
      }
    } else {
      let sel = me.getNative();
      if (sel && sel.rangeCount) {
        let firstRange = sel.getRangeAt(0);
        let lastRange = sel.getRangeAt(sel.rangeCount - 1);
        range
          .setStart(firstRange.startContainer, firstRange.startOffset)
          .setEnd(lastRange.endContainer, lastRange.endOffset);
        if (
          range.collapsed &&
          domUtils.isBody(range.startContainer) &&
          !range.startOffset
        ) {
          optimze(range);
        }
      } else {
        //trace:1734 有可能已经不在dom树上了，标识的节点
        if (
          this._bakRange &&
          domUtils.inDoc(this._bakRange.startContainer, this.document)
        ) {
          return this._bakRange;
        }
        optimze(range);
      }
    }
    return (this._bakRange = range);
  }

  /**
   * 获取开始元素，用于状态反射
   * @method getStart
   * @return { Element } 获得开始元素
   * @example
   * ```javascript
   * editor.selection.getStart();
   * ```
   */
  getStart() {
    if (this._cachedStartElement) {
      return this._cachedStartElement;
    }
    let range = browser.ie9below ? this.getIERange() : this.getRange(),
      tmpRange,
      start,
      tmp,
      parent;
    if (browser.ie9below) {
      if (!range) {
        //todo 给第一个值可能会有问题
        return this.document.body.firstChild;
      }
      //control元素
      if (range.item) {
        return range.item(0);
      }
      tmpRange = range.duplicate();
      //修正ie下<b>x</b>[xx] 闭合后 <b>x|</b>xx
      tmpRange.text.length > 0 && tmpRange.moveStart('character', 1);
      tmpRange.collapse(1);
      start = tmpRange.parentElement();
      parent = tmp = range.parentElement();
      while ((tmp = tmp.parentNode)) {
        if (tmp == start) {
          start = parent;
          break;
        }
      }
    } else {
      range.shrinkBoundary();
      start = range.startContainer;
      if (start.nodeType == 1 && start.hasChildNodes()) {
        start =
          start.childNodes[
            Math.min(start.childNodes.length - 1, range.startOffset)
          ];
      }
      if (start.nodeType == 3) {
        return start.parentNode;
      }
    }
    return start;
  }

  /**
   * 得到选区中的文本
   * @method getText
   * @return { String } 选区中包含的文本
   * @example
   * ```javascript
   * editor.selection.getText();
   * ```
   */
  getText() {
    let nativeSel, nativeRange;
    if (this.isFocus() && (nativeSel = this.getNative())) {
      nativeRange = browser.ie9below
        ? nativeSel.createRange()
        : nativeSel.getRangeAt(0);
      return browser.ie9below ? nativeRange.text : nativeRange.toString();
    }
    return '';
  }

  /**
   * 清除选区
   * @method clearRange
   * @example
   * ```javascript
   * editor.selection.clearRange();
   * ```
   */
  clearRange() {
    this.getNative()[browser.ie9below ? 'empty' : 'removeAllRanges']();
  }
}
