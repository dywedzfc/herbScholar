const axios = require('axios')
const cheerio = require('cheerio')

module.exports.getBookAuthorSearchAPI = function (query, callback) {
  let url = 'https://www.88dus.com/search/so.php'
  let data = {q: query}
  return axios(url, {
    headers: {
      referer: 'https://www.88dus.com/',
      host: 'www.88dus.com'
    },
    params: data
  }).then(response => {
    const $ = cheerio.load(response.data)
    let bookList = []
    $('.ops_cover').find('.block').each(function (index, item) {
      let book = {}
      let bookImg = $(item).find('.block_img img')
      let bookUrl = $(item).find('.block_txt > a')
      $(item).find('.block_txt > a ~ p').each(function () {
        if ($(this).text().indexOf('&#x4F5C;&#x8005;&#xFF1A;') > -1) book.author = $(this).text().trim()
        else if ($(this).text().indexOf('&#x7C7B;&#x578B;&#xFF1A;') > -1) book.type = $(this).text().trim()
        else if ($(this).text().length > 0) book.introduction = $(this).text().trim()
      })
      let imgUrl = bookImg.attr('onerror')
      book.imgUrl = imgUrl.substring(imgUrl.indexOf('\'') + 1, imgUrl.lastIndexOf('\''))
      book.title = bookImg.attr('alt')
      book.bookUrl = bookUrl.attr('href')
      book.url = 'https://www.88dus.com'
      bookList.push(book)
    })
    callback(bookList)
  }).catch(e => {
    console.info(e)
  })
}

module.exports.getBookAuthor88dusSearchAPI = function (query, callback) {
  let url = query.url + query.search
  let data = {q: query.q, page: query.page, search_field: 0}
  return axios(url, {
    headers: {
      referer: 'https://www.88dus.com/',
      host: 'www.88dus.com'
    },
    params: data
  }).then(response => {
    const $ = cheerio.load(response.data)
    let bookList = []
    $('.ops_cover').find('.block').each(function (index, item) {
      let book = {}
      let bookImg = $(item).find('.block_img img')
      let bookUrl = $(item).find('.block_txt > a')
      $(item).find('.block_txt > a ~ p').each(function () {
        if ($(this).text().indexOf('作者：') > -1) book.author = $(this).text().trim()
        else if ($(this).text().indexOf('类型：') > -1) book.type = $(this).text().trim()
        else if ($(this).text().length > 0) book.desc = $(this).text().trim()
      })
      let imgUrl = bookImg.attr('onerror')
      book.img = bookImg.attr('src')
      book.imgerr = imgUrl.substring(imgUrl.indexOf('\'') + 1, imgUrl.lastIndexOf('\''))
      book.name = bookImg.attr('alt')
      book.book = bookUrl.attr('href')
      book.url = 'https://www.88dus.com'
      bookList.push(book)
    })
    if ($('.ops_cover').find('.ops_no').length > 0) {
      let ret = {code: 1, msg: '未搜索到数据'}
      callback(ret)
    } else {
      let ret = {code: 0, data: bookList, page: (parseInt(data.page) + 1)}
      callback(ret)
    }
  }).catch(e => {
    console.info(e)
  })
}

module.exports.getBookAuthorXanbhxSearchAPI = function (query, callback) {
  let url = query.url + query.search
  let data = {q: query.q, page: query.page, search_field: 0}
  console.info('getBookAuthor88dusSearchAPI:', data)
  return axios(url, {
    headers: {
      referer: 'https://www.88dus.com/',
      host: 'www.88dus.com'
    },
    params: data
  }).then(response => {
    const $ = cheerio.load(response.data)
    let bookList = []
    $('.ops_cover').find('.block').each(function (index, item) {
      let book = {}
      let bookImg = $(item).find('.block_img img')
      let bookUrl = $(item).find('.block_txt > a')
      $(item).find('.block_txt > a ~ p').each(function () {
        if ($(this).text().indexOf('作者：') > -1) book.author = $(this).text().trim()
        else if ($(this).text().indexOf('类型：') > -1) book.type = $(this).text().trim()
        else if ($(this).text().length > 0) book.desc = $(this).text().trim()
      })
      let imgUrl = bookImg.attr('onerror')
      book.img = bookImg.attr('src')
      book.imgerr = imgUrl.substring(imgUrl.indexOf('\'') + 1, imgUrl.lastIndexOf('\''))
      book.name = bookImg.attr('alt')
      book.book = bookUrl.attr('href')
      book.url = 'https://www.88dus.com'
      bookList.push(book)
    })
    if ($('.ops_cover').find('.ops_no').length > 0) {
      let ret = {code: 1, msg: '未搜索到数据'}
      callback(ret)
    } else {
      let ret = {code: 0, data: bookList, page: (parseInt(data.page) + 1)}
      callback(ret)
    }
  }).catch(e => {
    console.info(e)
  })
}
/*
import jsonp from 'common/script/jsonp'

export function getBookAuthorSearchAPI (item, query) {
  let url = item.url + item.search
  const data = Object.assign({}, item.commonParams, {
    q: query
  })
  console.info('getBookAuthorSearchAPI:', url, data)
  return jsonp(url, data, item.option)
}
*/
