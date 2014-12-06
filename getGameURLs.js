var fs = require('fs')
var d3 = require('d3')
var queue = require('queue')
var request = require('request')
var cheerio = require('cheerio')
var queue = require('queue')

//download one game a time
var q = queue(1)

//load existing games
var dates = JSON.parse(fs.readFileSync('dates.json', 'utf8'))

//don't update ga
dates.forEach(function(d){
	if (d.games) return
	q.defer(getGamesFromDate, d.str)
})

q.awaitAll(function(err, data){
	console.log(data)
	data.forEach(function(d){
		if (data.games){
			_.findWhere(dates, {str: d.str}).games = d.games
		}
	})
})

function getGamesFromDate(cb, dateStr){
  var url = 'http://www.basketball-reference.com/boxscores/index.cgi?' + dateStr

  request(url, function(error, response, html){
    if(!error){
      var rv = []
      var $ = cheerio.load(html);
      $('.stw .align_right.bold_text a').each(function(i, this){
        rv.push({url: $(this).attr('href')})
      })
  	}
  	
  	cb(null, {str: dateStr, games: rv ? : rv : null})
	})
}