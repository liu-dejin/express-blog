const express = require('express')
//创建路由对象
const router = express.Router()
const userHandler = require('../router_handler/user')

//导入数据表单验证的中间件
const expressJoi = require('@escook/express-joi')
//导入需要的验证规则对象
const { reg_login_schema } = require("../schema/user")

// 注册接口使用验证中间件
// 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
//  数据验证通过后，会把这次请求流转给后面的路由处理函数
//  数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
//注册接口
router.post('/reg', expressJoi(reg_login_schema), userHandler.reg)

//登录接口
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

//路由导出
module.exports = router
