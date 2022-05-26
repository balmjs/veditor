import browser from '../browser';

/**
 * 动态添加css样式
 * @method cssRule
 * @param { String } 节点名称
 * @grammar UE.utils.cssRule('添加的样式的节点名称',['样式'，'放到哪个document上'])
 * @grammar UE.utils.cssRule('body','body{background:#ccc}') => null  //给body添加背景颜色
 * @grammar UE.utils.cssRule('body') =>样式的字符串  //取得key值为body的样式的内容,如果没有找到key值先关的样式将返回空，例如刚才那个背景颜色，将返回 body{background:#ccc}
 * @grammar UE.utils.cssRule('body',document) => 返回指定key的样式，并且指定是哪个document
 * @grammar UE.utils.cssRule('body','') =>null //清空给定的key值的背景颜色
 */

const rule1 = function (key, style, doc) {
  let indexList, index;
  if (style === undefined || (style && style.nodeType && style.nodeType == 9)) {
    //获取样式
    doc =
      style && style.nodeType && style.nodeType == 9 ? style : doc || document;
    indexList = doc.indexList || (doc.indexList = {});
    index = indexList[key];
    if (index !== undefined) {
      return doc.styleSheets[index].cssText;
    }
    return undefined;
  }
  doc = doc || document;
  indexList = doc.indexList || (doc.indexList = {});
  index = indexList[key];
  //清除样式
  if (style === '') {
    if (index !== undefined) {
      doc.styleSheets[index].cssText = '';
      delete indexList[key];
      return true;
    }
    return false;
  }

  //添加样式
  if (index !== undefined) {
    sheetStyle = doc.styleSheets[index];
  } else {
    sheetStyle = doc.createStyleSheet('', (index = doc.styleSheets.length));
    indexList[key] = index;
  }
  sheetStyle.cssText = style;
};

const rule2 = function (key, style, doc) {
  let head, node;
  if (style === undefined || (style && style.nodeType && style.nodeType == 9)) {
    //获取样式
    doc =
      style && style.nodeType && style.nodeType == 9 ? style : doc || document;
    node = doc.getElementById(key);
    return node ? node.innerHTML : undefined;
  }
  doc = doc || document;
  node = doc.getElementById(key);

  //清除样式
  if (style === '') {
    if (node) {
      node.parentNode.removeChild(node);
      return true;
    }
    return false;
  }

  //添加样式
  if (node) {
    node.innerHTML = style;
  } else {
    node = doc.createElement('style');
    node.id = key;
    node.innerHTML = style;
    doc.getElementsByTagName('head')[0].appendChild(node);
  }
};

const rule = browser.ie && browser.version != 11 ? rule1 : rule2;

export default rule;
