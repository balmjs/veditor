// TODO: 语言包加载方式待确认
export default function checkCurLang(I18N) {
  for (let lang in I18N) {
    return lang;
  }
}
