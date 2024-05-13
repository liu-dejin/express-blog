const joi = require('joi')
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
//用户的注册登录验证规则
const username = joi.string().alphanum().min(5).max(10).required()
//密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
exports.reg_login_schema = {
  body: {
    username,
    password,
    repassword: joi.ref('password')
  }
}
//id,nickname,email 更新用户数据的验证模块
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email
  }
}
//重置密码的校验模块
exports.update_password_schema = {
  body: {
    // 使用 password 这个规则，验证 req.body.old_pwd 的值
    old_pwd: password,
    // 使用 joi.not(joi.ref('old_pwd')).concat(password) 规则，验证 req.body.new_pwd 的值
    // 解读：
    // 1. joi.ref('old_pwd') 表示 new_pwd 的值必须和 old_pwd 的值保持一致
    // 2. joi.not(joi.ref('old_pwd')) 表示 new_pwd 的值不能等于 old_pwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('old_pwd')) 和 password 这两条验证规则
    new_pwd: joi.not(joi.ref('old_pwd')).concat(password),
    re_pwd: joi.ref('new_pwd')
  }
}

//更新头像的校验模块
const avatar = joi.string().dataUri().required()
exports.update_avatar_schema = {
  body: {
    avatar
  }
}