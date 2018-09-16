const axios = require('axios')
const cheerio = require('cheerio')
const escaper = require('true-html-escape')

module.exports.getBookDetailsSearch = function (query, callback) {}

const get88dusIntroductionInfo = $ => {
  let introduction = {}
  let imgBox = $('.jieshao .lf img')
  introduction.img = imgBox.attr('src')
  introduction.name = imgBox.attr('alt')
  $('.jieshao .rt .msg em').each(function (index) {
    // let index = -1
    console.info('get88dusIntroductionInfo-each:', escaper.escape($(this).text()))
    // if ((index = $(this).text().indexOf('作者：')) > -1) introduction.author = $(this).text().substring(index + 3).trim()
    // else if ((index = $(this).text().indexOf('状态：')) > -1) introduction.state = $(this).text().substring(index + 3).trim()
    // else if ((index = $(this).text().indexOf('更新时间：')) > -1) introduction.state = $(this).text().substring(index + 5).trim()
    // else if ($(this).text().indexOf('最新章节：') > -1) introduction.latestChapter = {name: $(this).find('a').text().trim(), url: $(this).find('a').attr('href')}
    if (index === 0) introduction.author = $(this).text().trim()
    else if (index === 1) introduction.state = $(this).text().substring(index + 3).trim()
    else if (index === 2) introduction.latestTime = $(this).text().substring(index + 5).trim()
    else if (index === 3) introduction.latestChapter = {name: $(this).find('a').text().trim(), url: $(this).find('a').attr('href')}
  })
  console.info('get88dusIntroductionInfo:', introduction, $('.jieshao').html())
  return introduction
}

const get88dusMenuList = $ => {
  let menuList = []
  $('.mulu ul li').each(function () {
    let menuItem = {}
    let title = $(this).find('a')
    menuItem.name = title.text()
    menuItem.url = title.attr('href')
    menuList.push(menuItem)
  })
  return menuList
}

module.exports.get88dusBookDetailsSearch = function (query, callback) {
  let url = query.url
  return axios(url).then(response => {
    const $ = cheerio.load(response.data)
    let bookDetails = {}
    bookDetails.introduction = get88dusIntroductionInfo($)
    bookDetails.menuList = get88dusMenuList($)
    console.info('get88dusBookDetailsSearch:', $.html())
    callback(bookDetails)
  })
}
