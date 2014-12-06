var fs = require('fs')
var d3 = require('d3')
var queue = require('queue')
var request = require('request')
var cheerio = require('cheerio')
var queue = require('queue-async')
var _ = require('underscore')


//download one game a time
var q = queue(10)

//load existing games
var dates = JSON.parse(fs.readFileSync('dates.json', 'utf8'))

//don't update days with already loaded scores
dates.forEach(function(d){
	if (d.games) return
	q.defer(getGamesFromDate, d.str)
})

q.awaitAll(function(err, data){
	data.forEach(function(d){
		if (d.games){
			var matchingDate = _.findWhere(dates, {str: d.str})
			matchingDate.games = d.games
		}
	})
	console.log(dates)
	fs.writeFile('dates.json', JSON.stringify(dates, null, 4))
})

function getGamesFromDate(dateStr, cb){
  var url = 'http://www.basketball-reference.com/boxscores/index.cgi?' + dateStr

  request(url, function(error, response, html){
    if(!error){
      var rv = []
      var $ = cheerio.load(html);

      $('.align_right.bold_text a').each(function(i){
      	console.log(i)
        rv.push({url: $(this).attr('href')})
      })
  	}

  	cb(null, {str: dateStr, games: rv ? rv : null})
	})
}