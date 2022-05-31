import constants from './constants';
import keys from './keys';
import fillChar from './fill-char';

import getPosition from './get-position';
import getNodeIndex from './get-node-index';
import inDoc from './in-doc';
import findParent from './find-parent';
import findParents from './find-parents';
import findParentByTagName from './find-parent-by-tag-name';
import insertAfter from './insert-after';
import remove from './remove';
import getNextDomNode from './get-next-dom-node';
import getPreDomNode from './get-pre-dom-node';
import isBookmarkNode from './is-bookmark-node';
import getWindow from './get-window';
import getCommonAncestor from './get-common-ancestor';
import clearEmptySibling from './clear-empty-sibling';
import split from './split';
import isWhitespace from './is-whitespace';
import getXY from './get-x-y';
import on from './on';
import un from './un';
import isSameElement from './is-same-element';
import isSameStyle from './is-same-style';
import isBlockElm from './is-block-elm';
import isBody from './is-body';
import breakParent from './break-parent';
import isEmptyInlineElement from './is-empty-inline-element';
import trimWhiteTextNode from './trim-white-text-node';
import mergeChild from './merge-child';
import getElementsByTagName from './get-elements-by-tag-name';
import mergeToParent from './merge-to-parent';
import mergeSibling from './merge-sibling';
import unSelectable from './un-selectable';
import removeAttributes from './remove-attributes';
import createElement from './create-element';
import setAttributes from './set-attributes';
import getComputedStyle from './get-computed-style';
import removeClasses from './remove-classes';
import addClass from './add-class';
import hasClass from './has-class';
import preventDefault from './prevent-default';
import removeStyle from './remove-style';
import getStyle from './get-style';
import setStyle from './set-style';
import setStyles from './set-styles';
import removeDirtyAttr from './remove-dirty-attr';
import getChildCount from './get-child-count';
import isEmptyNode from './is-empty-node';
import clearSelectedArr from './clear-selected-arr';
import scrollToView from './scroll-to-view';
import isBr from './is-br';
import isFillChar from './is-fill-char';
import isStartInBlock from './is-start-in-block';
import isEmptyBlock from './is-empty-block';
import setViewportOffset from './set-viewport-offset';
import fillNode from './fill-node';
import moveChild from './move-child';
import hasNoAttributes from './has-no-attributes';
import isCustomeNode from './is-custome-node';
import isTagNode from './is-tag-node';
import filterNodeList from './filter-node-list';
import isInNodeEndBoundary from './is-in-node-end-boundary';
import isBoundaryNode from './is-boundary-node';
import fillHtml from './fill-html';

import reg from './fill-char-reg';

export const fillCharReg = reg;

export default {
  ...constants,
  fillChar,
  keys,
  getPosition,
  getNodeIndex,
  inDoc,
  findParent,
  findParents,
  findParentByTagName,
  insertAfter,
  remove,
  getNextDomNode,
  getPreDomNode,
  isBookmarkNode,
  getWindow,
  getCommonAncestor,
  clearEmptySibling,
  split,
  isWhitespace,
  getXY,
  on,
  un,
  isSameElement,
  isSameStyle,
  isBlockElm,
  isBody,
  breakParent,
  isEmptyInlineElement,
  trimWhiteTextNode,
  mergeChild,
  getElementsByTagName,
  mergeToParent,
  mergeSibling,
  unSelectable,
  removeAttributes,
  createElement,
  setAttributes,
  getComputedStyle,
  removeClasses,
  addClass,
  hasClass,
  preventDefault,
  removeStyle,
  getStyle,
  setStyle,
  setStyles,
  removeDirtyAttr,
  getChildCount,
  isEmptyNode,
  clearSelectedArr,
  scrollToView,
  isBr,
  isFillChar,
  isStartInBlock,
  isEmptyBlock,
  setViewportOffset,
  fillNode,
  moveChild,
  hasNoAttributes,
  isCustomeNode,
  isTagNode,
  filterNodeList,
  isInNodeEndBoundary,
  isBoundaryNode,
  fillHtml
};
