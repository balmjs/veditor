import utils from '../utils';
import domUtils from '../dom-utils';
import browser, { isIe } from '../browser';

/**
 * 渲染编辑器的DOM到指定容器
 * @method render
 * @param { String } containerId 指定一个容器ID
 * @remind 执行该方法,会触发ready事件
 * @warning 必须且只能调用一次
 */

/**
 * 渲染编辑器的DOM到指定容器
 * @method render
 * @param { Element } containerDom 直接指定容器对象
 * @remind 执行该方法,会触发ready事件
 * @warning 必须且只能调用一次
 */
export default function render(container) {
  let me = this,
    options = me.options,
    getStyleValue = function (attr) {
      return parseInt(domUtils.getComputedStyle(container, attr));
    };
  if (utils.isString(container)) {
    container = document.getElementById(container);
  }
  if (container) {
    if (options.initialFrameWidth) {
      options.minFrameWidth = options.initialFrameWidth;
    } else {
      options.minFrameWidth = options.initialFrameWidth = container.offsetWidth;
    }
    if (options.initialFrameHeight) {
      options.minFrameHeight = options.initialFrameHeight;
    } else {
      options.initialFrameHeight = options.minFrameHeight =
        container.offsetHeight;
    }

    container.style.width = /%$/.test(options.initialFrameWidth)
      ? '100%'
      : options.initialFrameWidth -
        getStyleValue('padding-left') -
        getStyleValue('padding-right') +
        'px';
    container.style.height = /%$/.test(options.initialFrameHeight)
      ? '100%'
      : options.initialFrameHeight -
        getStyleValue('padding-top') -
        getStyleValue('padding-bottom') +
        'px';

    container.style.zIndex = options.zIndex;

    // TODO: 这里需要更换一种UE的加载方式
    // TODO: 需要以字符串模板来重新书写
    let html =
      (isIe && browser.version < 9 ? '' : '<!DOCTYPE html>') +
      "<html xmlns='http://www.w3.org/1999/xhtml' class='view' ><head>" +
      "<style type='text/css'>" +
      //设置四周的留边
      '.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}\n' +
      //设置默认字体和字号
      //font-family不能呢随便改，在safari下fillchar会有解析问题
      'body{margin:8px;font-family:sans-serif;font-size:16px;}' +
      //设置段落间距
      'p{margin:5px 0;}</style>' +
      (options.iframeCssUrl
        ? "<link rel='stylesheet' type='text/css' href='" +
          utils.unhtml(options.iframeCssUrl) +
          "'/>"
        : '') +
      (options.initialStyle
        ? '<style>' + options.initialStyle + '</style>'
        : '') +
      "</head><body class='view' ></body>" +
      "<script type='text/javascript' " +
      (isIe ? "defer='defer'" : '') +
      " id='_initialScript'>" +
      "setTimeout(function(){editor = window.parent.UE.instants['ueditorInstant" +
      me.uid +
      "'];editor._setup(document);},0);" +
      "var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);</script></html>";
    container.appendChild(
      domUtils.createElement(document, 'iframe', {
        id: 'ueditor_' + me.uid,
        width: '100%',
        height: '100%',
        frameborder: '0',
        //先注释掉了，加的原因忘记了，但开启会直接导致全屏模式下内容多时不会出现滚动条
        //                    scrolling :'no',
        src:
          'javascript:void(function(){document.open();' +
          (options.customDomain && document.domain != location.hostname
            ? 'document.domain="' + document.domain + '";'
            : '') +
          'document.write("' +
          html +
          '");document.close();}())'
      })
    );
    container.style.overflow = 'hidden';
    //解决如果是给定的百分比，会导致高度算不对的问题
    setTimeout(function () {
      if (/%$/.test(options.initialFrameWidth)) {
        options.minFrameWidth = options.initialFrameWidth =
          container.offsetWidth;
        //如果这里给定宽度，会导致ie在拖动窗口大小时，编辑区域不随着变化
        //                        container.style.width = options.initialFrameWidth + 'px';
      }
      if (/%$/.test(options.initialFrameHeight)) {
        options.minFrameHeight = options.initialFrameHeight =
          container.offsetHeight;
        container.style.height = options.initialFrameHeight + 'px';
      }
    });
  }
}
