const db = require('../db/index')
const bcrypt = require('bcryptjs')
//根据用户id查询用户的基本信息
exports.getUserInfo = (req, res) => {
  //防止密码泄露 排错password字段
  const sql = 'select id ,username,nickname,email ,user_pic from users where id=?'
  //执行sql req.auth 是token解析后挂载到req上的
  db.query(sql, req.auth.id, (err, results) => {
    //执行失败
    if (err) return res.cc(err)
    //执行成功但查询的数据条数<1
    if (results.length !== 1) return res.cc('获取用户信息失败！')
    //成功,将用户信息传给客户端
    res.send({
      code: 0,
      message: '获取用户基本信息成功！',
      data: results
    })
  })
}
//更新用户基本信息
exports.updateUserInfo = (req, res) => {
  //定义sql语句
  const sql = 'update users set ? where id = ?'
  //执行sql
  db.query(sql, [req.body, req.body.id], (err, results) => {
    //sdl 执行失败
    if (err) return res.cc(err)
    //执行sql成功但条数不为1
    if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
    //修改成功
    return res.cc('修改用户基本信息成功！', 0)
  })
}
//更新用户密码
exports.updatePassword = (req, res) => {
  const userinfo = req.body
  console.log(userinfo)
  // 非空判断 前端同步处理
  if (!userinfo.old_pwd || !userinfo.new_pwd || !userinfo.re_pwd) {
    return res.send({
      code: 1,
      message: '密码和确认密码不能为空'
    })
  }

  if (userinfo.new_pwd !== userinfo.re_pwd) {
    return res.send({
      code: 2,
      message: '密码和确认密码不一致'
    })
  }

  //定义sql
  const sql = `select * from users where id=?`
  //执行sql
  db.query(sql, req.auth.id, (err, results) => {
    //执行sql失败
    if (err) return res.cc(err)
    //检查指定id的用户是否存在
    if (results.length !== 1) return res.cc('用户不存在!')
    // 使用 bcrypt.compareSync(提交的密码，数据库中的密码) 方法验证密码是否正确
    // compareSync() 函数的返回值为布尔值，true 表示密码正确，false 表示密码错误
    const compaerResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compaerResult) return res.cc('原密码错误')

    //更新密码的sql
    const sql = 'update users set password=? where id=?'
    //对新密码进行bcrypt加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

    // 执行 SQL 语句，根据 id 更新用户的密码
    db.query(sql, [newPwd, req.auth.id], (err, results) => {
      // SQL 语句执行失败
      if (err) return res.cc(err)
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('更新密码失败！')
      // 更新密码成功
      res.cc('更新密码成功！', 0)
    })
  })
}