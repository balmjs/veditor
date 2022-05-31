import dtd from '../dtd';
import utils from '../utils';

export const notTransAttrs = {
  href: 1,
  src: 1,
  _src: 1,
  _href: 1,
  cdata_data: 1
};

export const notTransTagName = {
  style: 1,
  script: 1
};

export const indentChar = '    ',
  breakChar = '\n';

export const insertLine = function (arr, current, begin) {
  arr.push(breakChar);
  return current + (begin ? 1 : -1);
};

export const insertIndent = function (arr, current) {
  //插入缩进
  for (let i = 0; i < current; i++) {
    arr.push(indentChar);
  }
};

export const isText = function (node, arr) {
  if (node.parentNode.tagName == 'pre') {
    //源码模式下输入html标签，不能做转换处理，直接输出
    arr.push(node.data);
  } else {
    arr.push(
      notTransTagName[node.parentNode.tagName]
        ? utils.html(node.data)
        : node.data.replace(/[ ]{2}/g, ' &nbsp;')
    );
  }
};

export const isElement = function (node, arr, formatter, current) {
  let attrhtml = '';
  if (node.attrs) {
    attrhtml = [];
    let attrs = node.attrs;
    for (let a in attrs) {
      //这里就针对
      //<p>'<img src='http://nsclick.baidu.com/u.gif?&asdf=\"sdf&asdfasdfs;asdf'></p>
      //这里边的\"做转换，要不用innerHTML直接被截断了，属性src
      //有可能做的不够
      attrhtml.push(
        a +
          (attrs[a] !== undefined
            ? '="' +
              (notTransAttrs[a]
                ? utils.html(attrs[a]).replace(/["]/g, function (a) {
                    return '&quot;';
                  })
                : utils.unhtml(attrs[a])) +
              '"'
            : '')
      );
    }
    attrhtml = attrhtml.join(' ');
  }
  arr.push(
    '<' +
      node.tagName +
      (attrhtml ? ' ' + attrhtml : '') +
      (dtd.$empty[node.tagName] ? '/' : '') +
      '>'
  );
  //插入新行
  if (formatter && !dtd.$inlineWithA[node.tagName] && node.tagName != 'pre') {
    if (node.children && node.children.length) {
      current = insertLine(arr, current, true);
      insertIndent(arr, current);
    }
  }
  if (node.children && node.children.length) {
    for (let i = 0, ci; (ci = node.children[i++]); ) {
      if (
        formatter &&
        ci.type == 'element' &&
        !dtd.$inlineWithA[ci.tagName] &&
        i > 1
      ) {
        insertLine(arr, current);
        insertIndent(arr, current);
      }
      nodeToHtml(ci, arr, formatter, current);
    }
  }
  if (!dtd.$empty[node.tagName]) {
    if (formatter && !dtd.$inlineWithA[node.tagName] && node.tagName != 'pre') {
      if (node.children && node.children.length) {
        current = insertLine(arr, current);
        insertIndent(arr, current);
      }
    }
    arr.push('</' + node.tagName + '>');
  }
};

export const isComment = function (node, arr) {
  arr.push('<!--' + node.data + '-->');
};

export const nodeToHtml = function (node, arr, formatter, current) {
  switch (node.type) {
    case 'root':
      for (let i = 0, ci; (ci = node.children[i++]); ) {
        //插入新行
        if (
          formatter &&
          ci.type == 'element' &&
          !dtd.$inlineWithA[ci.tagName] &&
          i > 1
        ) {
          insertLine(arr, current, true);
          insertIndent(arr, current);
        }
        nodeToHtml(ci, arr, formatter, current);
      }
      break;
    case 'text':
      isText(node, arr);
      break;
    case 'element':
      isElement(node, arr, formatter, current);
      break;
    case 'comment':
      isComment(node, arr, formatter);
  }
  return arr;
};

export const getNodeById = function (root, id) {
  var node;
  if (root.type == 'element' && root.getAttr('id') == id) {
    return root;
  }
  if (root.children && root.children.length) {
    for (let i = 0, ci; (ci = root.children[i++]); ) {
      if ((node = getNodeById(ci, id))) {
        return node;
      }
    }
  }
};

export const getNodesByTagName = function (node, tagName, arr) {
  if (node.type == 'element' && node.tagName == tagName) {
    arr.push(node);
  }
  if (node.children && node.children.length) {
    for (let i = 0, ci; (ci = node.children[i++]); ) {
      getNodesByTagName(ci, tagName, arr);
    }
  }
};

export const nodeTraversal = function (root, fn) {
  if (root.children && root.children.length) {
    for (let i = 0, ci; (ci = root.children[i]); ) {
      nodeTraversal(ci, fn);
      //ci被替换的情况，这里就不再走 fn了
      if (ci.parentNode) {
        if (ci.children && ci.children.length) {
          fn(ci);
        }
        if (ci.parentNode) i++;
      }
    }
  } else {
    fn(root);
  }
};
