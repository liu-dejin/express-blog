//导入express模块
const express = require('express')

//创建路由对象
const router = express.Router()

//创建验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

//导入用户处理信息函数模块
const userinfo_handler = require('../router_handler/userinfo')
//获取用户资料
router.get('/userinfo', userinfo_handler.getUserInfo)
//更新用户资料
router.put('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
// 重置密码的
router.patch('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
//更新用户头像
router.patch('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)


//对外共享路由
module.exports = router