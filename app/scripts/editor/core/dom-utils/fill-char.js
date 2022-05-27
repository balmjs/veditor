import browser, { isIe } from '../browser';

//ie6使用其他的会有一段空白出现
const fillChar = isIe && browser.version == '6' ? '\ufeff' : '\u200B';

export default fillChar;
