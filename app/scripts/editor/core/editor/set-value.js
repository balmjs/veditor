import utils from '../utils';

/**
 * 获取编辑器的html内容，赋值到编辑器所在表单的textarea文本域里面
 * @private
 * @method setValue
 * @param { UE.Editor } editor 编辑器事例
 */
export default function (form, editor) {
  var textarea;
  if (editor.textarea) {
    if (utils.isString(editor.textarea)) {
      for (
        let i = 0, ti, tis = domUtils.getElementsByTagName(form, 'textarea');
        (ti = tis[i++]);

      ) {
        if (ti.id == 'ueditor_textarea_' + editor.options.textarea) {
          textarea = ti;
          break;
        }
      }
    } else {
      textarea = editor.textarea;
    }
  }
  if (!textarea) {
    form.appendChild(
      (textarea = domUtils.createElement(document, 'textarea', {
        name: editor.options.textarea,
        id: 'ueditor_textarea_' + editor.options.textarea,
        style: 'display:none'
      }))
    );
    //不要产生多个textarea
    editor.textarea = textarea;
  }
  !textarea.getAttribute('name') &&
    textarea.setAttribute('name', editor.options.textarea);
  textarea.value = editor.hasContents()
    ? editor.options.allHtmlEnabled
      ? editor.getAllHtml()
      : editor.getContent(null, null, true)
    : '';
}
