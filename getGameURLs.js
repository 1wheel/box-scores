var fs = require('fs')
var d3 = require('d3')
var queue = require('queue')
var request = require('request')
var cheerio = require('cheerio')

var dates = JSON.parse(fs.readFileSync('dates.json', 'utf8'));

function getGamesFromDate(cb, dateStr){
  var url = 'http://www.basketball-reference.com/boxscores/index.cgi?' + dateStr

  request(url, function(error, response, html){
    if(!error){
      var rv = []
      var $ = cheerio.load(html);
      $('.stw .align_right.bold_text a').each(function(i, this){
        rv.push()
      })

  })
})


}