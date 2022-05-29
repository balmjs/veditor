import utils from '../utils';

/**
 * 该方法是提供给插件里面使用，设置配置项默认值
 * @method setOpt
 * @warning 三处设置配置项的优先级: 实例化时传入参数 > setOpt()设置 > config文件里设置
 * @warning 该方法仅供编辑器插件内部和编辑器初始化时调用，其他地方不能调用。
 * @param { String } key 编辑器的可接受的选项名称
 * @param { * } val  该选项可接受的值
 * @example
 * ```javascript
 * editor.setOpt( 'initContent', '欢迎使用编辑器' );
 * ```
 */

/**
 * 该方法是提供给插件里面使用，以{key:value}集合的方式设置插件内用到的配置项默认值
 * @method setOpt
 * @warning 三处设置配置项的优先级: 实例化时传入参数 > setOpt()设置 > config文件里设置
 * @warning 该方法仅供编辑器插件内部和编辑器初始化时调用，其他地方不能调用。
 * @param { Object } options 将要设置的选项的键值对对象
 * @example
 * ```javascript
 * editor.setOpt( {
 *     'initContent': '欢迎使用编辑器'
 * } );
 * ```
 */
export default function setOpt(key, val) {
  var obj = {};
  if (utils.isString(key)) {
    obj[key] = val;
  } else {
    obj = key;
  }
  utils.extend(this.options, obj, true);
}
