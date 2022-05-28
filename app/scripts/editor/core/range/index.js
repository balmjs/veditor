import cloneContents from './clone-contents';
import deleteContents from './delete-contents';
import extractContents from './extract-contents';
import setStart from './set-start';
import setEnd from './set-end';
import setStartAfter from './set-start-after';
import setStartBefore from './set-start-before';
import setEndAfter from './set-end-after';
import setEndBefore from './set-end-before';
import setStartAtFirst from './set-start-at-first';
import setStartAtLast from './set-start-at-last';
import setEndAtFirst from './set-end-at-first';
import setEndAtLast from './set-end-at-last';

/**
 * Range封装
 * @file
 * @module UE.dom
 * @class Range
 * @since 1.2.6.1
 */

/**
 * dom操作封装
 * @unfile
 * @module UE.dom
 */

/**
 * Range实现类，本类是UEditor底层核心类，封装不同浏览器之间的Range操作。
 * @unfile
 * @module UE.dom
 * @class Range
 */

export default class Range {
  /**
   * 创建一个跟document绑定的空的Range实例
   * @constructor
   * @param { Document } document 新建的选区所属的文档对象
   */

  /**
   * @property { Node } startContainer 当前Range的开始边界的容器节点, 可以是一个元素节点或者是文本节点
   */

  /**
   * @property { Node } startOffset 当前Range的开始边界容器节点的偏移量, 如果是元素节点，
   *                              该值就是childNodes中的第几个节点， 如果是文本节点就是文本内容的第几个字符
   */

  /**
   * @property { Node } endContainer 当前Range的结束边界的容器节点, 可以是一个元素节点或者是文本节点
   */

  /**
   * @property { Node } endOffset 当前Range的结束边界容器节点的偏移量, 如果是元素节点，
   *                              该值就是childNodes中的第几个节点， 如果是文本节点就是文本内容的第几个字符
   */

  /**
   * @property { Boolean } collapsed 当前Range是否闭合
   * @default true
   * @remind Range是闭合的时候， startContainer === endContainer && startOffset === endOffset
   */

  /**
   * @property { Document } document 当前Range所属的Document对象
   * @remind 不同range的的document属性可以是不同的
   */
  constructor(document) {
    this.startContainer =
      this.startOffset =
      this.endContainer =
      this.endOffset =
        null;
    this.document = document;
    this.collapsed = true;
  }

  cloneContents = cloneContents;
  deleteContents = deleteContents;
  extractContents = extractContents;
  setStart = setStart;
  setEnd = setEnd;
  setStartAfter = setStartAfter;
  setStartBefore = setStartBefore;
  setEndAfter = setEndAfter;
  setEndBefore = setEndBefore;
  setStartAtFirst = setStartAtFirst;
  setStartAtLast = setStartAtLast;
  setEndAtFirst = setEndAtFirst;
  setEndAtLast = setEndAtLast;
}
