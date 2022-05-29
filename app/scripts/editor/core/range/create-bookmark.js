import guid from './guid';

/**
 * 创建当前range的一个书签，记录下当前range的位置，方便当dom树改变时，还能找回原来的选区位置
 * @method createBookmark
 * @param { Boolean } serialize 控制返回的标记位置是对当前位置的引用还是ID，如果该值为true，则
 *                              返回标记位置的ID， 反之则返回标记位置节点的引用
 * @return { Object } 返回一个书签记录键值对， 其包含的key有： start => 开始标记的ID或者引用，
 *                          end => 结束标记的ID或引用， id => 当前标记的类型， 如果为true，则表示
 *                          返回的记录的类型为ID， 反之则为引用
 */
export default function (serialize, same) {
  let endNode,
    startNode = this.document.createElement('span');
  startNode.style.cssText = 'display:none;line-height:0px;';
  startNode.appendChild(this.document.createTextNode('\u200D'));
  startNode.id = '_baidu_bookmark_start_' + (same ? '' : guid++);

  if (!this.collapsed) {
    endNode = startNode.cloneNode(true);
    endNode.id = '_baidu_bookmark_end_' + (same ? '' : guid++);
  }
  this.insertNode(startNode);
  if (endNode) {
    this.collapse().insertNode(endNode).setEndBefore(endNode);
  }
  this.setStartAfter(startNode);
  return {
    start: serialize ? startNode.id : startNode,
    end: endNode ? (serialize ? endNode.id : endNode) : null,
    id: serialize
  };
}
