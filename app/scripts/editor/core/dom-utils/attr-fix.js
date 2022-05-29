import browser, { isIe } from '../browser';

export default isIe && browser.version < 9
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
    };
