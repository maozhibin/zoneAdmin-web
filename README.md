# zoneAdmin-web
内参群后台前端代码


主要用到的技术栈有React+React-router+Redux+Webpack+ES6。

文件目录结构：

前端技术分享 > web端技术规范 > 图片 1.png



项目使用：

1)       克隆项目文件：

git clone http://git.51caocao.cn/web/scaffold.git

2)       进入项目目录，安装依赖：

npm install  推荐使用淘宝镜像[cnpm]  或者使用yarn install（推荐）

3)       开发阶段：

a)       npm run go

b)       打开 http://localhost:8080

4）项目构建（发布）：

       a)  npm run build

       b)   将build文件夹部署到服务器，nginx指向该文件夹即可

如何创建一个页面/模块：wiki地址



3.组件使用
目前我们已经提供了一些少量组件的使用，往后会提供更多的业务组件以便于加快开发效率。



已有的基础组件：

1.HTTP组件：基于Promise封装

使用方法：已经在基类中对http request做了全局封装，会捕获并统一处理code非0的异常情况。



2.路由组件：

React Router 中文文档 在项目中的使用可以参照routes.js：

1.引入页面主体：

import Module1Page1 from './containers/module1/Page1';

2.添加路由：

<Route path="module1">

  <Route path="page1" component={Module1Page1} />    </Route>



3.时间处理组件：momentJS



4.UI组件：使用方法可参见antDesign官方文档，文档地址：Ant Design of React。

（ps：另建议开发过程中直接使用组件，不添加额外的样式文件修改组件样式。）





4.编写规范
编码规范我们内部遵循Airbnb的编码规范，详细可以查阅Airbnb JavaScript Style Guide。

另外，在项目文件中有一个.eslintrc.js文件，该文件是基于eslint（js编码质控工具）的代码规范配置文件。简单看下部分配置：

前端技术分享 > web端技术规范 > lALPAAAAAQ1Q5a3NAZ3NAaw_428_413.png_620x10000q90g.jpg

基于此，可以规范编码风格及提升代码质量。
