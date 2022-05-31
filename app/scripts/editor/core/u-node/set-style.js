import utils from '../utils';

/**
 * 给节点设置样式
 * @method setStyle
 * @param { String } name 要设置的的样式名称
 * @param { String } val 要设置的的样值
 * @example
 * ```javascript
 * node.setStyle('font-size', '12px');
 * ```
 */

const exec = function (name, val, cssStyle) {
  let reg = new RegExp('(^|;)\\s*' + name + ':([^;]+;?)', 'gi');
  cssStyle = cssStyle.replace(reg, '$1');
  if (val) {
    cssStyle = name + ':' + utils.unhtml(val) + ';' + cssStyle;
  }
};

export default function setStyle(name, val) {
  let cssStyle = this.getAttr('style');
  if (!cssStyle) {
    cssStyle = '';
  }
  if (utils.isObject(name)) {
    for (let a in name) {
      exec(a, name[a], cssStyle);
    }
  } else {
    exec(name, val);
  }
  this.setAttr('style', utils.trim(cssStyle));
}
