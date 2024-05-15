//导入express
const express = require('express')
//创建路由对象
const router = express.Router()

// 导入 multer 和 path
const multer = require('multer')
const path = require('path')

// 创建 multer 的实例
const uploads = multer({ dest: path.join(__dirname, '../uploads') })

//导入文章的验证中间件
const expressJoi = require('@escook/express-joi')
//导入文章的验证模块
const { add_article_schema, list_article_schema, del_article_schema, eidt_article_schema } = require('../schema/article')


//导入文章逻辑处理函数
const article_handler = require('../router_handler/article')
//发布新文章
// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中

// 先使用 multer 解析表单数据
// 再使用 expressJoi 对解析的表单数据进行验证
router.post('/add', uploads.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)
// 获取文章列表
router.get('/list', expressJoi(list_article_schema), article_handler.listArticle)
//获取文章详细
router.get('/info', expressJoi(del_article_schema), article_handler.queryArticleDetail)
// 删除文章接口
router.delete('/info', expressJoi(del_article_schema), article_handler.delArticle)
//更新文章接口
router.put('/info', uploads.single('cover_img'), expressJoi(eidt_article_schema), article_handler.editArticle)
//导入路由模块
module.exports = router