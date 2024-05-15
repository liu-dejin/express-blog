const path = require('path')
const db = require('../db/index')

//发布新文章
exports.addArticle = (req, res) => {
  //判断前端是否提交了封面图片
  if (!req.file || req.file.fieldname !== 'cover_img')
    return res.cc('文章封面是必选参数!')
  //定义数据提交对象
  const articleInfo = {
    // 标题、内容、状态、所属的分类Id
    ...req.body,
    // 文章封面在服务器端的存放路径
    cover_img: path.join('/uploads', req.file.filename),
    // 文章发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.auth.id
  }
  //定义sql
  const sql = 'insert into articles set ?'
  //执行sql
  db.query(sql, articleInfo, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('文章发布失败!')
    //文章发布成功
    res.cc('发布文章成功', 0)
  })
}
//获取文章列表
exports.listArticle = (req, res) => {
  //文章列表获取处理
  const sql = `select a.id, a.title, a.pub_date, a.state, b.cate_name as cate_name
                from articles as a,article_cate as b 
                where a.cate_id = b.id and a.cate_id = ifnull(?, a.cate_id)  and a.state = ifnull(?, a.state) and a.is_delete = 0  limit ?,?`
  db.query(sql, [req.query.cate_id || null, req.query.state || null, (req.query.pagenum - 1) * req.query.pagesize, req.query.pagesize], (err, results) => {
    if (err) return res.cc(err)
    //文章总数获取处理  count(*)
    const countSql = 'select count(*) as num from articles where is_delete = 0 and state = ifnull(?,state) and cate_id = ifnull(?,cate_id)'
    db.query(countSql, [req.query.state || null, req.query.cate_id || null], (err, total) => {
      if (err) return res.cc(err)
      let [{ num }] = total
      res.send({
        code: 0,
        message: '获取文章列表成功',
        data: results,
        total: num
      })
    })
  })
}


//删除文章
exports.delArticle = (req, res) => {
  const sql = 'update articles set is_delete = 1 where id = ?'
  db.query(sql, [req.query.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) {
      return res.cc('删除文章失败')
    }
    res.cc('删除成功', 0)
  })
}
//更新文章
exports.editArticle = (req, res) => {
  //判断前端是否提交了封面图片
  if (!req.file || req.file.fieldname !== 'cover_img')
    return res.cc('文章封面是必选参数!')
  //定义sql
  const sql = 'update articles set ? where id = ?'
  //准备数据
  const articleinfo = {
    ...req.body,
    pub_date: new Date(),
    cover_img: path.join('/uploads', req.file.filename)
  }
  //执行sql
  db.query(sql, [articleinfo, req.body.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) {
      res.cc('更新文章失败')
    }
    res.cc('更新文章成功', 0)
  })
}
//获取文章详细
exports.queryArticleDetail = (req, res) => {
  const sql = `
    SELECT 
      a.*,
      c.cate_name,
      u.username,
      u.nickname
    FROM 
      articles a
    LEFT JOIN 
      article_cate c ON a.cate_id = c.id
    LEFT JOIN 
      users u ON a.author_id = u.id
    WHERE 
      a.id =?
  `
  db.query(sql, [req.query.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 0) return res.cc('文章不存在')
    res.send({
      code: 0,
      message: '获取文章成功！',
      data: results[0]
    })
  })
}
