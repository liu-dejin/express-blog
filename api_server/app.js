//导入express模块
const express = require('express')
//导入路由模块
const userRouter = require('./router/user')
const userinfoRouter = require('./router/userinfo')
const artCateRouter = require('./router/artcate')
//创建express服务器实例
const app = express()


//导入并配置cors 跨域
const cors = require('cors')
app.use(cors())

//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json())

//封装res.cc 处理失败
app.use((req, res, next) => {
  res.cc = (err, code = 1) => {
    res.send({
      //状态  默认为1 表示失败
      code,
      //err 可能是一个错误对象也有可能是一个错误的描述字符串
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

//解析token的中间件
//导入配置文件
const config = require('./config')
//解析token的中间件
const expressJWT = require('express-jwt')
// .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT.expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

// /api 登录注册接口
app.use('/api', userRouter)
// /my 都是需要权限的接口
//用户相关接口
app.use('/my', userinfoRouter)
//文章分类接口
app.use('/my/cate', artCateRouter)
//全局错误中间件 捕获验证失败,把失败的结果响应给客户端
const joi = require('joi')
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  //未知的错误
  res.cc(err)
})

//调用app.listen()方法
app.listen(3007, () => {
  console.log('Express server running at http://127.0.0.1:3007')
})