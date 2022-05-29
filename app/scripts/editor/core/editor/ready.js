/**
 * 编辑器对外提供的监听ready事件的接口， 通过调用该方法，达到的效果与监听ready事件是一致的
 * @method ready
 * @param { Function } fn 编辑器ready之后所执行的回调, 如果在注册事件之前编辑器已经ready，将会
 * 立即触发该回调。
 * @remind 需要等待编辑器加载完成后才能执行的代码,可以使用该方法传入
 * @example
 * ```javascript
 * editor.ready( function( editor ) {
 *     editor.setContent('初始化完毕');
 * } );
 * ```
 * @see UE.Editor.event:ready
 */
export default function ready(fn) {
  if (fn) {
    this.isReady ? fn.apply(this) : this.addListener('ready', fn);
  }
}
