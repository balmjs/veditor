# Get Started

## ueditor 富文本编辑器介绍

UEditor 是由百度 web 前端研发部开发所见即所得富文本 web 编辑器，具有轻量，可定制，注重用户体验等特点，开源基于 MIT 协议，允许自由使用和修改代码。

## 入门部署和体验

### 第一步：下载编辑器

到官网下载 ueditor 最新版：[[官网地址]](http://ueditor.baidu.com/website/download.html#ueditor "官网下载地址")

### 第二步：创建 demo 文件

解压下载的包，在解压后的目录创建 demo.html 文件，填入下面的 html 代码

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <title>ueditor demo</title>
  </head>
  <body>
    <!-- 加载编辑器的容器 -->
    <script id="container" name="content" type="text/plain">
      这里写你的初始化内容
    </script>
    <!-- 配置文件 -->
    <script type="text/javascript" src="ueditor.config.js"></script>
    <!-- 编辑器源码文件 -->
    <script type="text/javascript" src="ueditor.all.js"></script>
    <!-- 实例化编辑器 -->
    <script type="text/javascript">
      var ue = UE.getEditor('container');
    </script>
  </body>
</html>
```

### 第三步：在浏览器打开 demo.html

如果看到了下面这样的编辑器，恭喜你，初次部署成功！

![部署成功](http://fex.baidu.com/ueditor/doc/images/demo.png)

### 自定义的参数

编辑器有很多可自定义的参数项，在实例化的时候可以传入给编辑器：

```javascript
var ue = UE.getEditor('container', {
  autoHeight: false
});
```

配置项也可以通过 ueditor.config.js 文件修改，具体的配置方法请看[前端配置项说明](http://fex.baidu.com/ueditor/#start-config1.4 前端配置项说明.md)

### 设置和读取编辑器的内容

通 getContent 和 setContent 方法可以设置和读取编辑器的内容

```javascript
var ue = UE.getContent();
ue.ready(function () {
  //设置编辑器的内容
  ue.setContent('hello');
  //获取html内容，返回: <p>hello</p>
  var html = ue.getContent();
  //获取纯文本内容，返回: hello
  var txt = ue.getContentTxt();
});
```

ueditor 的更多 API 请看[API 文档](http://ueditor.baidu.com/doc 'ueditor API 文档')

## 相关链接

ueditor 官网：[http://ueditor.baidu.com](http://ueditor.baidu.com 'ueditor 官网')

ueditor API 文档：[http://ueditor.baidu.com/doc](http://ueditor.baidu.com/doc 'ueditor API 文档')

ueditor github 地址：[http://github.com/fex-team/ueditor](http://github.com/fex-team/ueditor 'ueditor github 地址')

## 详细文档

ueditor 文档：[http://fex.baidu.com/ueditor/](http://fex.baidu.com/ueditor/)

## 联系我们

email：[ueditor@baidu.com](mailto://email:ueditor@baidu.com '发邮件给ueditor开发组')
issue：[github issue](http://github.com/fex-team/ueditor/issues 'ueditor 论坛')
