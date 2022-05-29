import domUtils from '../dom-utils';
import browser from '../browser';
import fillData from './fill-data';

/**
 * 删除fillData
 * @param doc
 * @param excludeNode
 */
export default function removeFillData(doc, excludeNode) {
  try {
    if (fillData && domUtils.inDoc(fillData, doc)) {
      if (!fillData.nodeValue.replace(fillCharReg, '').length) {
        let tmpNode = fillData.parentNode;
        domUtils.remove(fillData);
        while (
          tmpNode &&
          domUtils.isEmptyInlineElement(tmpNode) &&
          //safari的contains有bug
          (browser.safari
            ? !(
                domUtils.getPosition(tmpNode, excludeNode) &
                domUtils.POSITION_CONTAINS
              )
            : !tmpNode.contains(excludeNode))
        ) {
          fillData = tmpNode.parentNode;
          domUtils.remove(tmpNode);
          tmpNode = fillData;
        }
      } else {
        fillData.nodeValue = fillData.nodeValue.replace(fillCharReg, '');
      }
    }
  } catch (e) {}
}
