//导入验证模块
const joi = require('joi')
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
//定义分类名称和分类别名验证模块
const cate_name = joi.string().required()
const cate_alias = joi.string().alphanum().required()
//定义新增分类的接口验证模块
exports.add_cate_schema = {
  body: {
    cate_name,
    cate_alias
  }
}
//定义删除接口的query:id 的验证模块
const id = joi.number().integer().min(1).required()
exports.delete_cate_schema = {
  params: { id }
}
//定义更新接口的query:id 的验证模块
exports.get_cate_schema = {
  params: { id }
}
//定义更新分类验证模块
exports.update_cate_scheme = {
  body: {
    id,
    cate_name,
    cate_alias
  }
}