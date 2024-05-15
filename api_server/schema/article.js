const joi = require('joi')

// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()

//查询文章的验证规则
const pagenum = joi.number().integer().min(0).required()
const pagesize = joi.number().integer().min(1).required()
const cate_id_optional = joi.number().integer().min(1).optional()
const state_optional = joi.string().valid('草稿', '已发布').optional()

//文章id
const id = joi.number().integer().min(1).required()

//发布文章验证规则
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state
  }
}
//获取文章列表验证规则
exports.list_article_schema = {
  query: {
    pagenum,
    pagesize,
    cate_id: cate_id_optional,
    state: state_optional
  }
}
//删除文章列表验证规则
exports.del_article_schema = {
  query: {
    id
  }
}
//更新文章列表验证规则
exports.eidt_article_schema = {
  body: {
    id,
    title,
    cate_id,
    content,
    state
  }
}