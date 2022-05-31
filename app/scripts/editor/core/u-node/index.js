import htmlparser from '../htmlparser';
import utils from '../utils';

import toHtml from './to-html';
import innerHTML from './inner-h-t-m-l';
import innerText from './inner-text';
import getData from './get-data';
import firstChild from './first-child';
import lastChild from './last-child';
import previousSibling from './previous-sibling';
import nextSibling from './next-sibling';
import replaceChild from './replace-child';
import appendChild from './append-child';
import insertBefore from './insert-before';
import insertAfter from './insert-after';
import removeChild from './remove-child';
import getAttr from './get-attr';
import setAttr from './set-attr';
import getIndex from './get-index';
import getNodeById from './get-node-by-id';
import getNodesByTagName from './get-nodes-by-tag-name';
import getStyle from './get-style';
import setStyle from './set-style';
import traversal from './traversal';

/**
 * 编辑器模拟的节点类
 * @file
 * @module UE
 * @class uNode
 * @since 1.2.6.1
 */

/**
 * UEditor公用空间，UEditor所有的功能都挂载在该空间下
 * @unfile
 * @module UE
 */
/**
 * 通过一个键值对，创建一个uNode对象
 * @constructor
 * @param { Object } attr 传入要创建的uNode的初始属性
 * @example
 * ```javascript
 * var node = new uNode({
 *     type:'element',
 *     tagName:'span',
 *     attrs:{style:'font-size:14px;'}
 * }
 * ```
 */
export default class uNode {
  constructor(obj) {
    this.type = obj.type;
    this.data = obj.data;
    this.tagName = obj.tagName;
    this.parentNode = obj.parentNode;
    this.attrs = obj.attrs || {};
    this.children = obj.children;
  }

  //创建uNode的静态方法
  //支持标签和html
  static createElement = function (html) {
    if (/[<>]/.test(html)) {
      return htmlparser(html).children[0];
    } else {
      return new uNode({
        type: 'element',
        children: [],
        tagName: html
      });
    }
  };

  static createText = function (data, noTrans) {
    return new uNode({
      type: 'text',
      data: noTrans ? data : utils.unhtml(data || '')
    });
  };

  toHtml = toHtml;
  innerHTML = innerHTML;
  innerText = innerText;
  getData = getData;
  firstChild = firstChild;
  lastChild = lastChild;
  previousSibling = previousSibling;
  nextSibling = nextSibling;
  replaceChild = replaceChild;
  appendChild = appendChild;
  insertBefore = insertBefore;
  insertAfter = insertAfter;
  removeChild = removeChild;
  getAttr = getAttr;
  setAttr = setAttr;
  getIndex = getIndex;
  getNodeById = getNodeById;
  getNodesByTagName = getNodesByTagName;
  getStyle = getStyle;
  setStyle = setStyle;
  traversal = traversal;
}
