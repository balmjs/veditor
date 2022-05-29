import EventBase from '../event-base';
import utils from '../utils';

import uid from './uid';
import langReadied from './lang-readied';
import registerCommand from './register-command';

import ready from './ready';
import setOpt from './set-opt';
import getOpt from './get-opt';
import destroy from './destroy';
import render from './render';

/**
 * 编辑器主类，包含编辑器提供的大部分公用接口
 * @file
 * @module UE
 * @class Editor
 * @since 1.2.6.1
 */

/**
 * UEditor公用空间，UEditor所有的功能都挂载在该空间下
 * @unfile
 * @module UE
 */

/**
 * UEditor的核心类，为用户提供与编辑器交互的接口。
 * @unfile
 * @module UE
 * @class Editor
 */

/**
 * 编辑器准备就绪后会触发该事件
 * @module UE
 * @class Editor
 * @event ready
 * @remind render方法执行完成之后,会触发该事件
 * @remind
 * @example
 * ```javascript
 * editor.addListener( 'ready', function( editor ) {
 *     editor.execCommand( 'focus' ); //编辑器家在完成后，让编辑器拿到焦点
 * } );
 * ```
 */
/**
 * 执行destroy方法,会触发该事件
 * @module UE
 * @class Editor
 * @event destroy
 * @see UE.Editor:destroy()
 */
/**
 * 执行reset方法,会触发该事件
 * @module UE
 * @class Editor
 * @event reset
 * @see UE.Editor:reset()
 */
/**
 * 执行focus方法,会触发该事件
 * @module UE
 * @class Editor
 * @event focus
 * @see UE.Editor:focus(Boolean)
 */
/**
 * 语言加载完成会触发该事件
 * @module UE
 * @class Editor
 * @event langReady
 */
/**
 * 运行命令之后会触发该命令
 * @module UE
 * @class Editor
 * @event beforeExecCommand
 */
/**
 * 运行命令之后会触发该命令
 * @module UE
 * @class Editor
 * @event afterExecCommand
 */
/**
 * 运行命令之前会触发该命令
 * @module UE
 * @class Editor
 * @event firstBeforeExecCommand
 */
/**
 * 在getContent方法执行之前会触发该事件
 * @module UE
 * @class Editor
 * @event beforeGetContent
 * @see UE.Editor:getContent()
 */
/**
 * 在getContent方法执行之后会触发该事件
 * @module UE
 * @class Editor
 * @event afterGetContent
 * @see UE.Editor:getContent()
 */
/**
 * 在getAllHtml方法执行时会触发该事件
 * @module UE
 * @class Editor
 * @event getAllHtml
 * @see UE.Editor:getAllHtml()
 */
/**
 * 在setContent方法执行之前会触发该事件
 * @module UE
 * @class Editor
 * @event beforeSetContent
 * @see UE.Editor:setContent(String)
 */
/**
 * 在setContent方法执行之后会触发该事件
 * @module UE
 * @class Editor
 * @event afterSetContent
 * @see UE.Editor:setContent(String)
 */
/**
 * 每当编辑器内部选区发生改变时，将触发该事件
 * @event selectionchange
 * @warning 该事件的触发非常频繁，不建议在该事件的处理过程中做重量级的处理
 * @example
 * ```javascript
 * editor.addListener( 'selectionchange', function( editor ) {
 *     console.log('选区发生改变');
 * }
 */
/**
 * 在所有selectionchange的监听函数执行之前，会触发该事件
 * @module UE
 * @class Editor
 * @event beforeSelectionChange
 * @see UE.Editor:selectionchange
 */
/**
 * 在所有selectionchange的监听函数执行完之后，会触发该事件
 * @module UE
 * @class Editor
 * @event afterSelectionChange
 * @see UE.Editor:selectionchange
 */
/**
 * 编辑器内容发生改变时会触发该事件
 * @module UE
 * @class Editor
 * @event contentChange
 */

/**
 * 以默认参数构建一个编辑器实例
 * @constructor
 * @remind 通过 改构造方法实例化的编辑器,不带ui层.需要render到一个容器,编辑器实例才能正常渲染到页面
 * @example
 * ```javascript
 * var editor = new UE.Editor();
 * editor.execCommand('blod');
 * ```
 * @see UE.Config
 */

/**
 * 以给定的参数集合创建一个编辑器实例，对于未指定的参数，将应用默认参数。
 * @constructor
 * @remind 通过 改构造方法实例化的编辑器,不带ui层.需要render到一个容器,编辑器实例才能正常渲染到页面
 * @param { Object } setting 创建编辑器的参数
 * @example
 * ```javascript
 * var editor = new UE.Editor();
 * editor.execCommand('blod');
 * ```
 * @see UE.Config
 */
// NOTE: 这里移除了原来的继承方法，直接使用原生的继承方式
// 原：utils.inherits(Editor, EventBase);
export default class Editor extends EventBase {
  constructor(options) {
    var me = this;
    me.uid = uid++;
    // TODO: 待确认是否需要移除
    EventBase.call(me);
    me.commands = {};
    // TODO: UEDITOR_CONFIG需要提出
    me.options = utils.extend(utils.clone(options || {}), UEDITOR_CONFIG, true);
    me.shortcutkeys = {};
    me.inputRules = [];
    me.outputRules = [];

    // TODO: 待提出defalutOptions
    //设置默认的常用属性
    me.setOpt(Editor.defaultOptions(me));

    // TODO: 这里需要移除，但是影响待确认
    /* 尝试异步加载后台配置 */
    me.loadServerConfig();

    // TODO: 原来UE命名空间待引入
    if (!utils.isEmptyObject(UE.I18N)) {
      //修改默认的语言类型
      me.options.lang = checkCurLang(UE.I18N);
      UE.plugin.load(me);
      langReadied(me);
    } else {
      // TODO: 需要更换语言包加载方式
      utils.loadFile(
        document,
        {
          src:
            me.options.langPath +
            me.options.lang +
            '/' +
            me.options.lang +
            '.js',
          tag: 'script',
          type: 'text/javascript',
          defer: 'defer'
        },
        function () {
          UE.plugin.load(me);
          langReadied(me);
        }
      );
    }

    UE.instants['ueditorInstant' + me.uid] = me;
  }

  registerCommand = registerCommand;
  ready = ready;
  setOpt = setOpt;
  getOpt = getOpt;
  destroy = destroy;
  render = render;
}
