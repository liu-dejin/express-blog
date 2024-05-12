/**
 * 与用户路由相关的处理函数   供/router/user.js
 */
//导入数据库模块
const db = require('../db/index')
//密码加密 bcrypt
const bcrypt = require('bcryptjs')
//生成token的jsonwebtoken模块
const jwt = require('jsonwebtoken')
//导入配置文件
const config = require('../config')
exports.reg = (req, res) => {
  //接收表单数据
  const userinfo = req.body
  console.log(userinfo)

  // 非空判断 前端同步处理
  if (!userinfo.username || !userinfo.password || !userinfo.repassword) {
    return res.send({
      code: 1,
      message: '用户名、密码和确认密码不能为空'
    })
  }

  if (userinfo.password !== userinfo.repassword) {
    return res.send({
      code: 2,
      message: '密码和确认密码不一致'
    })
  }

  //定义查询用户sql
  const sql = 'select * from users where username=?'
  //执行sql判断用户名是否被占用
  db.query(sql, userinfo.username, (err, results) => {
    // sql执行失败
    if (err) {
      // return res.send({ code: '1', message: err.message })
      return res.cc(err)
    }
    // 用户名被占用 长度>0即存在
    if (results.length > 0) {
      /*       return res.send({ code: '1', message: '用户名被占用，请更换其他用户名！' }) */
      return res.cc('用户名被占用,请更换其他用户名！')
    }
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    //定义插入用户的sql语句
    const sql = 'insert into users set ?'
    //执行插入sql
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
      // if (err) return res.send({ code: 1, message: err.message })
      if (err) return res.cc(err)
      //判断results.affectedRows是否为1
      /*       if (results.affectedRows !== 1) return res.send({ code: 1, message: '注册失败,请稍后重试' }) */
      if (results.affectedRows !== 1) return res.cc('注册失败,请稍后重试')
      // 注册成功
      /*       if (results.affectedRows === 1) {
              return req.send({
                code: 0, message: '注册成功！'
              })
            } */
      if (results.affectedRows === 1) {
        return res.cc('注册成功!', 0)
      }
    })
  })


}
exports.login = (req, res) => {
  //收集表单数据
  const userinfo = req.body
  //定义查询sql
  const sql = 'select * from users where username=?'
  //执行sql
  db.query(sql, userinfo.username, (err, results) => {
    //sql执行失败
    if (err) return res.cc(err)
    //sql成功但查询条数不等于1
    if (results.length !== 1) return res.cc('登录失败')
    //bcrypt.compareSync(用户提交的密码, 数据库中的密码) 判断密码是否正确
    const compaerResult = bcrypt.compareSync(userinfo.password, results[0].password)
    //结果等于false 则证明密码错误
    if (!compaerResult) {
      return res.cc('登录失败')
    }
    console.log(results)

    //生成jwt的token
    const user = {
      ...results[0], password: '', user_pic: ''
    }
    //生成tokent
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
    //将toke响应给客户端
    res.send({
      code: 0,
      message: '登录成功!',
      token: 'Bearer ' + tokenStr
    })
  })

}