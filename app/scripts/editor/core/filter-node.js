import utils from './utils';
import dtd from './dtd';

/**
 * UE过滤节点的静态方法
 * @file
 */

/**
 * UEditor公用空间，UEditor所有的功能都挂载在该空间下
 * @module UE
 */

/**
 * 根据传入节点和过滤规则过滤相应节点
 * @module UE
 * @since 1.2.6.1
 * @method filterNode
 * @param { Object } root 指定root节点
 * @param { Object } rules 过滤规则json对象
 * @example
 * ```javascript
 * UE.filterNode(root,editor.options.filterRules);
 * ```
 */

const _fiterNode = function (node, rules) {
  switch (node.type) {
    case 'text':
      break;
    case 'element':
      let val;
      if ((val = rules[node.tagName])) {
        if (val === '-') {
          node.parentNode.removeChild(node);
        } else if (utils.isFunction(val)) {
          let parentNode = node.parentNode,
            index = node.getIndex();
          val(node);
          if (node.parentNode) {
            if (node.children) {
              for (let i = 0, ci; (ci = node.children[i]); ) {
                _fiterNode(ci, rules);
                if (ci.parentNode) {
                  i++;
                }
              }
            }
          } else {
            for (let i = index, ci; (ci = parentNode.children[i]); ) {
              _fiterNode(ci, rules);
              if (ci.parentNode) {
                i++;
              }
            }
          }
        } else {
          let attrs = val['$'];
          if (attrs && node.attrs) {
            let tmpAttrs = {},
              tmpVal;
            for (let a in attrs) {
              tmpVal = node.getAttr(a);
              //todo 只先对style单独处理
              if (a == 'style' && utils.isArray(attrs[a])) {
                let tmpCssStyle = [];
                utils.each(attrs[a], function (v) {
                  let tmp;
                  if ((tmp = node.getStyle(v))) {
                    tmpCssStyle.push(v + ':' + tmp);
                  }
                });
                tmpVal = tmpCssStyle.join(';');
              }
              if (tmpVal) {
                tmpAttrs[a] = tmpVal;
              }
            }
            node.attrs = tmpAttrs;
          }
          if (node.children) {
            for (let i = 0, ci; (ci = node.children[i]); ) {
              _fiterNode(ci, rules);
              if (ci.parentNode) {
                i++;
              }
            }
          }
        }
      } else {
        //如果不在名单里扣出子节点并删除该节点,cdata除外
        if (dtd.$cdata[node.tagName]) {
          node.parentNode.removeChild(node);
        } else {
          let parentNode = node.parentNode,
            index = node.getIndex();
          node.parentNode.removeChild(node, true);
          for (let i = index, ci; (ci = parentNode.children[i]); ) {
            _fiterNode(ci, rules);
            if (ci.parentNode) {
              i++;
            }
          }
        }
      }
      break;
    case 'comment':
      node.parentNode.removeChild(node);
  }
};

export default function (root, rules) {
  if (utils.isEmptyObject(rules)) {
    return root;
  }
  let val;
  if ((val = rules['-'])) {
    utils.each(val.split(' '), function (k) {
      rules[k] = '-';
    });
  }
  for (let i = 0, ci; (ci = root.children[i]); ) {
    _fiterNode(ci, rules);
    if (ci.parentNode) {
      i++;
    }
  }
  return root;
}