import domUtils from '../dom-utils';

/**
 *  调整当前range的边界到书签位置，并删除该书签对象所标记的位置内的节点
 *  @method  moveToBookmark
 *  @param { BookMark } bookmark createBookmark所创建的标签对象
 *  @return { UE.dom.Range } 当前range对象
 *  @see UE.dom.Range:createBookmark(Boolean)
 */
export default function (bookmark) {
  let start = bookmark.id
      ? this.document.getElementById(bookmark.start)
      : bookmark.start,
    end =
      bookmark.end && bookmark.id
        ? this.document.getElementById(bookmark.end)
        : bookmark.end;
  this.setStartBefore(start);
  domUtils.remove(start);
  if (end) {
    this.setEndBefore(end);
    domUtils.remove(end);
  } else {
    this.collapse(true);
  }
  return this;
}
