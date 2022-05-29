// 语言包加载完毕钩子

export default function langReadied(me) {
  me.langIsReady = true;

  me.fireEvent('langReady');
}
