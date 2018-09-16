const express = require('express')
const searchBookAuthorAPI = require('../api/searchBookAuthorAPI')
const searchBookDetailsAPI = require('../api/searchBookDetailsAPI')
const config = require('../../common/script/config')
const util = require('../../common/script/util')

const Router = express.Router()

Router.get('/getBookAuthorSearch', function (req, res) {
  const query = req.query
  if (!query.page) query.page = 1
  for (let key in config.webLibrary) {
    let item = config.webLibrary[key]
    if (item.id === query.type) {
      const name = 'getBookAuthor' + util.firstUpperCase(query.type) + 'SearchAPI'
      let condition = {q: query.search, page: query.page, ...item}
      searchBookAuthorAPI[name](condition, function (data) {
        console.info('getBook:', data)
        res.json(data)
      })
    }
  }
})

Router.get('/getBookSearch', function (req, res) {
  const query = req.query
  for (let key in config.webLibrary) {
    let item = config.webLibrary[key]
    if (item.id === query.type) {
      const name = 'get' + util.firstUpperCase(query.type) + 'BookDetailsSearch'
      let condition = {url: query.url}
      searchBookDetailsAPI[name](condition, function (data) {
        console.info('getBookSearch:', data)
        res.json(data)
      })
    }
  }
})

module.exports = Router
