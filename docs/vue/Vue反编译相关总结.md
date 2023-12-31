
---
title: 关于我
date: 2023/11/01
---

# 一 适用类型
主要是针对只有项目通过 Vue + webpack 编译出来的源码, 并且包含 map后缀类型的文件, 文件结构类似如下: 
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12934573/1688001243437-90e48063-39c6-463b-99c5-38cc8ab3593c.png#averageHue=%23e7e9ea&clientId=u172de51e-2986-4&from=paste&height=252&id=u58a889c7&originHeight=504&originWidth=646&originalType=binary&ratio=2&rotation=0&showTitle=false&size=69715&status=done&style=none&taskId=u5f9eb496-b88b-453d-be40-7a42334860c&title=&width=323)
其中, app为主打包文件, 反编译主要编译app.js 该文件
```javascript
module.exports = {
  ... , // 其他配置项
  productionSourceMap:true // 是否需要生产环境的 map 映射文件
}
```
# 二 反编译 => Vue文件
目前主要有两种方式可以得到Vue文件, 第一种: 借助第三方库,例如 **reverse-sourcemap** ; 第二种: 通过浏览器控制台 **源代码工具手工扒取**

1. **reverse-sourcemap 反编译库**

该库主要是反编译 .map 文件, 从而得到 Vue 结构文件, 需要本地电脑全局安装该库, 这里有 Mac Os 示范安装过程: 

   1. 全局安装
```bash
sudo npm install --global reverse-sourcemap 
# sudo 是 mac 终端命令超级管理员权限
```

   2. 反编译 app.xxxxx.js.map 文件

本地创建一个新文件夹, 将 .map 文件放置在内, 随后终端输入以下命令: 
```bash
reverse-sourcemap --output-dir sourceCode app.xxxxxxx.js.map
```
将反编译后的源码 output 到 sourceCode 目录内, 等待编译成功即可获得 Vue 相关源文件

2. **借助控制台 - 源代码扒取**

需要在浏览器运行打包文件项目, 即可在浏览器控制 - 源代码 一栏 看到如下页面
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12934573/1688002769981-18f12d12-95a0-475e-94a0-7a43aef4333a.png#averageHue=%23faf7f6&clientId=u172de51e-2986-4&from=paste&height=423&id=u77d063cf&originHeight=1142&originWidth=788&originalType=binary&ratio=2&rotation=0&showTitle=false&size=141574&status=done&style=none&taskId=u0cf841d8-b434-41cc-978b-4d3fda132a6&title=&width=292)
已编写 - src 既是 Vue 相关的源码代码目录结构, 可以通过手工扒取的方式, 依次下载主要目录文件夹
# 三 完善Vue架子相关源码
无论是通过上述哪种方式获取的源码, 是无法直接运行的, 缺少很多重要文件,类似 package.json 等, 同时内部也有不少源码仍然编译文件, 因此需要我们本地构建一个Vue架子, 来进行辅助完善源码
Tips: 注意区分Vue版本, Vue 2 还是 Vue 3 
初始化完项目之后, 将 反编译的目录中的 主要目录拷贝至 新项目 src 下, 例如: assets / pages / components / layout / http / utils / router 等, 同时注意拷贝 main.js 文件
# 四 完善 package.json 信息
package.json 是管理npm信息的文件, 没有该文件, 我们是无法使用 npm i 来进行补项目依赖, 
在上述第二步等到的反编译文件夹内, 同时也包含了 node_modules 文件夹, 需要终端进入该目录, 执行以下命令
```bash
 npm shrinkwrap
```
获取等到一个新的 npm-shrinkwrap.json 文件, 里面记录了项目所需要的 npm 包 ( 但需要注意没有版本号相关信息 )
接下来, 只需要在 新融合的项目结构里, 根据  npm-shrinkwrap.json 里面的信息  一次安装 指定包即可
# 五 完善样式文件
项目中如果用到的是 less sass 等预编译样式文件的话, 是无法直接使用的, 因此我们需要进一步 解析 样式文件, 目前我解决方案如下: 

1.  通过样式美化工具或者格式化方式, 尽可能让结构看的清晰, 
2.  里面可能存在很多 转移符号, 需要通过全局替换方式替换掉
3.  进一步格式化, 存在语法、格式错误 一次排查解决

或许有更好的工具, 但目前还未发现, 如果有更好的方法, 可以一起讨论
# 六 尝试启动项目
将主要包安装完之后, 我们可以启动新项目啦! 初次启动, 仍然会有很大的概率会报错, 不要担心! 我们只需要根据控制台提示的错误 依次去解决即可. 
错误主要包括: 

1. 有缺失包没有安装 
2. 有错误格式代码( 存在仍然是编译后的代码 ) 
3. 路由相关错误 ( 路由格式错误等 )
4. 存在缓存问题 ( 删除node_modules/lock文件, 重新 npm i )
5. 插件版本问题，可根据node_modules文件查看版本号，若没有版本号只能用最新的版本再逐个排查问题

这一步比较费神, 因为错误的类型比较多, 需要有点耐心去解决, 主要项目跑起来, 后面的问题都不太大

