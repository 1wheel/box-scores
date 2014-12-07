var fs = require('fs')
var d3 = require('d3')
var queue = require('queue')
var request = require('request')
var cheerio = require('cheerio')
var queue = require('queue-async')
var _ = require('underscore')

//download ten game a time
var q = queue(10)

//load existing games
var dates = JSON.parse(fs.readFileSync('dates.json', 'utf8'))

//don't update days with already loaded scores
var games = []
dates.forEach(function(day){
  if (!day.games) return
  day.games.forEach(function(game){
    if (game.away) return
    q.defer(getBoxFromGame, game)
  })
})

q.awaitAll(function(err){
	fs.writeFile('dates.json', JSON.stringify(dates, null, 4))
})

function getBoxFromGame(game, cb){
  var url = 'http://www.basketball-reference.com/' + game.url

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);


      $('.align_right.bold_text a').each(function(i){
        matchingDate.games.push({url: $(this).attr('href')})
      })
  	}
  	cb(null)
	})
}