module.exports = options => {
  return async (req, res, next) => {
    const jwt = require('jsonwebtoken')
    // 错误处理包
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请提供jwt token')
    // console.log(token)
    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '无效的jwt token')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请登录')
    // console.log(req.user)
    await next()
  }
}