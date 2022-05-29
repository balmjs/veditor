import domUtils from '../dom-utils';

/**
 * 销毁编辑器实例，使用textarea代替
 * @method destroy
 * @example
 * ```javascript
 * editor.destroy();
 * ```
 */
export default function destroy() {
  let me = this;
  me.fireEvent('destroy');
  let container = me.container.parentNode;
  let textarea = me.textarea;
  if (!textarea) {
    textarea = document.createElement('textarea');
    container.parentNode.insertBefore(textarea, container);
  } else {
    textarea.style.display = '';
  }

  textarea.style.width = me.iframe.offsetWidth + 'px';
  textarea.style.height = me.iframe.offsetHeight + 'px';
  textarea.value = me.getContent();
  textarea.id = me.key;
  container.innerHTML = '';
  domUtils.remove(container);
  var key = me.key;
  //trace:2004
  for (let p in me) {
    if (me.hasOwnProperty(p)) {
      delete this[p];
    }
  }
  // TODO: 待替换为模块方法
  UE.delEditor(key);
}
