module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://apple:apple@localhost/node-vue-moba', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}