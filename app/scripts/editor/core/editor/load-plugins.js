// TODO: 这里需要重写改写加载方式

export default function loadPlugins(me) {
  //初始化插件
  for (let pi in UE.plugins) {
    UE.plugins[pi].call(me);
  }
}
