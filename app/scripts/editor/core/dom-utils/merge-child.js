import getElementsByTagName from './get-elements-by-tag-name';
import isBookmarkNode from './is-bookmark-node';
import trimWhiteTextNode from './trim-white-text-node';
import remove from './remove';
import isSameStyle from './is-same-style';
import isSameElement from './is-same-element';
import utils from '../utils';

/**
 * 合并node节点下相同的子节点
 * @name mergeChild
 * @desc
 * UE.dom.domUtils.mergeChild(node,tagName) //tagName要合并的子节点的标签
 * @example
 * <p><span style="font-size:12px;">xx<span style="font-size:12px;">aa</span>xx</span></p>
 * ==> UE.dom.domUtils.mergeChild(node,'span')
 * <p><span style="font-size:12px;">xxaaxx</span></p>
 */

export default function (node, tagName, attrs) {
  let list = getElementsByTagName(node, node.tagName.toLowerCase());
  for (let i = 0, ci; (ci = list[i++]); ) {
    if (!ci.parentNode || isBookmarkNode(ci)) {
      continue;
    }
    //span单独处理
    if (ci.tagName.toLowerCase() == 'span') {
      if (node === ci.parentNode) {
        trimWhiteTextNode(node);
        if (node.childNodes.length == 1) {
          node.style.cssText = ci.style.cssText + ';' + node.style.cssText;
          remove(ci, true);
          continue;
        }
      }
      ci.style.cssText = node.style.cssText + ';' + ci.style.cssText;
      if (attrs) {
        let style = attrs.style;
        if (style) {
          style = style.split(';');
          for (let j = 0, s; (s = style[j++]); ) {
            ci.style[utils.cssStyleToDomStyle(s.split(':')[0])] =
              s.split(':')[1];
          }
        }
      }
      if (isSameStyle(ci, node)) {
        remove(ci, true);
      }
      continue;
    }
    if (isSameElement(node, ci)) {
      remove(ci, true);
    }
  }
}
