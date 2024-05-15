const db = require('../db/index')
//获取文章分类
exports.getArticleCates = (req, res) => {
  const sql = 'select * from article_cate where is_delete=0 order by id asc'
  db.query(sql, (err, results) => {
    //执行失败
    if (err) return res.cc(err)
    //执行成功
    res.send({
      code: 0,
      message: '获取文章分类列表成功！',
      data: results
    })
  })
}
//新增文章分类
exports.addArticleCates = (req, res) => {
  //定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
  const sql = 'select * from article_cate where cate_name=? or cate_alias=?'
  //执行查重
  db.query(sql, [req.body.cate_name, req.body.cate_alias], (err, results) => {
    //sql执行失败
    if (err) return res.cc(err)
    //判断分类名称和分类别名是否被占用
    if (results.length === 2) return res.cc('此分类已存在！')
    if (results.length === 1 && results[0].cate_name === req.body.cate_name && results[0].cate_alias === req.body.cate_alias) return res.cc("分类名称与别名被占用，请更换后重试！")

    // 分别判断 分类名称 和 分类别名 是否被占用
    if (results.length === 1 && results[0].cate_name === req.body.cate_name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].cate_alias === req.body.cate_alias) return res.cc('分类别名被占用，请更换后重试！')

    //新增文章
    const sql = 'insert into article_cate set ?'
    db.query(sql, req.body, (err, results) => {
      // SQL 语句执行失败
      if (err) return res.cc(err)
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
      // 新增文章分类成功
      res.cc('新增文章分类成功！', 0)
    })
  })
}
//根据id删除文章分类
exports.deleteCateById = (req, res) => {

  //定义删除文章分类的sql
  const sql = 'update article_cate set is_delete=1 where id=?'
  //执行sql
  // req.query get请求带参数
  db.query(sql, [req.query.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败')
    res.cc('删除文章分类成功', 0)
  })
}
//根据id获取文章分类
exports.getArticleById = (req, res) => {
  const sql = 'select * from article_cate where id=?'
  db.query(sql, [req.query.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取文章分类数据失败')
    //获取成功
    res.send({
      code: 0,
      message: '获取文章分类数据成功!',
      data: results[0]
    })
  })
}
//根据id更新文章分类数据
exports.updatecate = (req, res) => {
  //查询分类名称和别名是否被占用
  const sql = 'select * from article_cate where Id<>? and (cate_name=? or cate_alias=?)'
  //查重操作
  db.query(sql, [req.body.id, req.body.cate_name, req.body.cate_alias], (err, results) => {
    //sql执行失败
    if (err) return res.cc(err)
    //判断 分类名称和分类别名是否被占用
    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].cate_name === req.body.cate_name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].cate_alias === req.body.cate_alias) return res.cc('分类别名被占用，请更换后重试！')
    //定义更新的sql
    const sql = 'update article_cate set ? where id = ?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新文章分类失败')
      res.cc('更新文章分类成功!', 0)
    })
  })
}
