/**
 * Dom操作工具包
 * @file
 * @module UE.dom.domUtils
 * @since 1.2.6.1
 */

/**
 * Dom操作工具包
 * @unfile
 * @module UE.dom.domUtils
 */
var attrFix =
    ie && browser.version < 9
      ? {
          tabindex: 'tabIndex',
          readonly: 'readOnly',
          for: 'htmlFor',
          class: 'className',
          maxlength: 'maxLength',
          cellspacing: 'cellSpacing',
          cellpadding: 'cellPadding',
          rowspan: 'rowSpan',
          colspan: 'colSpan',
          usemap: 'useMap',
          frameborder: 'frameBorder'
        }
      : {
          tabindex: 'tabIndex',
          readonly: 'readOnly'
        },
  styleBlock = utils.listToMap([
    '-webkit-box',
    '-moz-box',
    'block',
    'list-item',
    'table',
    'table-row-group',
    'table-header-group',
    'table-footer-group',
    'table-row',
    'table-column-group',
    'table-column',
    'table-cell',
    'table-caption'
  ]);
var domUtils = (dom.domUtils = {});
var fillCharReg = new RegExp(domUtils.fillChar, 'g');
