//导入express
const express = require('express')
//创建路由对象
const router = express.Router()

//导入路由处理模块
const artcate_handler = require('../router_handler/artcate')

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//导入文章分类的验证模块
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_scheme } = require('../schema/artcate')

//获取文章分类的列表数据
router.get('/list', artcate_handler.getArticleCates)
//新增文章分类
router.post('/add', expressJoi(add_cate_schema), artcate_handler.addArticleCates)
//根据id删除文章分类
router.delete('/del', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)
//根据id获取文章分类
router.get('/info', expressJoi(get_cate_schema), artcate_handler.getArticleById)
//根据id更新文章分类数据
router.put('/info', expressJoi(update_cate_scheme), artcate_handler.updatecate)

//导出路由
module.exports = router