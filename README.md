初学vue和node的一个小项目,如果这个项目让你有所收获，记得 Star 关注哦，这对我是非常不错的鼓励与支持

## 前端技术栈

- Vue.js：主要的前端框架
- Vue Router：用于前端路由管理
- Element Plus：UI 组件库
- @element-plus/icons-vue：Element Plus 的图标库
- axios：用于发送 HTTP 请求
- Pinia：状态管理库
- @vueup/vue-quill：富文本编辑器
- Sass：CSS 预处理器

### 开发工具及构建工具

- Vite：现代化前端构建工具
- eslint：代码规范检查工具
- eslint-plugin-vue：Vue.js 相关的 ESLint 插件
- @vue/eslint-config-prettier：Vue.js ESLint 配置与 Prettier 结合使用
- prettier：代码格式化工具
- husky：Git 钩子管理工具
- lint-staged：在提交时运行 lint 检查
- @rushstack/eslint-patch：用于在 Rush monorepo 中使用 ESLint

### Vite 插件

- @vitejs/plugin-vue：Vite 插件，用于支持 Vue 单文件组件
- unplugin-auto-import：Vite 插件，用于自动导入模块
- unplugin-vue-components：Vite 插件，用于支持自动导入 Vue 组件

### Pinia 插件

- pinia-plugin-persistedstate：Pinia 插件，用于持久化状态管理

## 后端技术栈

- Express：用于构建 Web 服务器的 Node.js 框架
- mysql : 热门的关系型数据库
- @escook/express-joi：Express 中间件，用于验证请求参数
- bcrypt 和 bcryptjs：用于密码哈希和验证
- cors：用于处理跨域请求
- express-jwt：Express 中间件，用于验证 JWT
- joi：用于数据验证
- jsonwebtoken：用于生成和验证 JWT
- multer：用于处理文件上传
- mysql2：MySQL Node.js 驱动程序

## 前端页面

- /login：登录页面，对应的组件为 LoginPage.vue
- /：根路径，对应的布局容器组件为 LayoutContainer.vue，重定向到 /article/manage
  - /article/manage：文章管理页面，对应的组件为 ArticleManage.vue
  - /article/channel：文章频道页面，对应的组件为 ArticleChannel.vue
  - /user/profile：用户个人资料页面，对应的组件为 UserProfile.vue
  - /user/avatar：用户头像页面，对应的组件为 UserAvatar.vue
  - /user/password：用户密码修改页面，对应的组件为 UserPassword.vue

## 后端接口

接口地址:[https://apifox.com/apidoc/shared-92eb7de4-d9e0-4037-9d0c-41396e49240f](https://apifox.com/apidoc/shared-92eb7de4-d9e0-4037-9d0c-41396e49240f)

### 文章分类接口

#### 获取文章分类列表数据

- 接口路径：/list
- 请求方法：GET
- 请求参数：无
- 响应数据：文章分类列表数据

#### 新增文章分类

- 接口路径：/add
- 请求方法：POST
- 请求参数：文章分类信息
- 响应数据：新增的文章分类信息

#### 删除文章分类

- 接口路径：/del
- 请求方法：DELETE
- 请求参数：文章分类id
- 响应数据：删除成功或失败信息

#### 获取文章分类详情

- 接口路径：/info
- 请求方法：GET
- 请求参数：文章分类id
- 响应数据：文章分类详情信息

#### 更新文章分类数据

- 接口路径：/info
- 请求方法：PUT
- 请求参数：文章分类id和更新的文章分类信息
- 响应数据：更新后的文章分类信息

### 文章接口

#### 新增文章

- 接口路径：/add
- 请求方法：POST
- 请求参数：文章信息和封面图片
- 响应数据：新增的文章信息

#### 获取文章列表

- 接口路径：/list
- 请求方法：GET
- 请求参数：查询条件
- 响应数据：文章列表数据

#### 获取文章详情

- 接口路径：/info
- 请求方法：GET
- 请求参数：文章id
- 响应数据：文章详细信息

#### 删除文章

- 接口路径：/info
- 请求方法：DELETE
- 请求参数：文章id
- 响应数据：删除成功或失败信息

#### 更新文章

- 接口路径：/info
- 请求方法：PUT
- 请求参数：文章id、更新的文章信息和封面图片
- 响应数据：更新后的文章信息

### 用户接口

#### 用户注册

- 接口路径：/reg
- 请求方法：POST
- 请求参数：注册信息
- 响应数据：注册成功或失败信息

#### 用户登录

- 接口路径：/login
- 请求方法：POST
- 请求参数：登录信息
- 响应数据：登录成功或失败信息

### 用户资料接口

#### 获取用户资料

- 接口路径：/userinfo
- 请求方法：GET
- 请求参数：无
- 响应数据：用户资料信息

#### 更新用户资料

- 接口路径：/userinfo
- 请求方法：PUT
- 请求参数：更新的用户资料信息
- 响应数据：更新后的用户资料信息

#### 重置密码

- 接口路径：/updatepwd
- 请求方法：PATCH
- 请求参数：新密码
- 响应数据：密码更新成功或失败信息

#### 更新用户头像

- 接口路径：/update/avatar
- 请求方法：PATCH
- 请求参数：新头像图片
- 响应数据：更新后的用户头像信息
  ## 
