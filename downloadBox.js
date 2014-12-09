var fs = require('fs')
var d3 = require('d3')
var request = require('request')
var cheerio = require('cheerio')
var queue = require('queue-async')
var _ = require('underscore')

//Box score columns
var columns = ['Name', 'MP','FG','FGA','FG%','3P','3PA','3P%','FT','FTA','FT%','ORB','DRB','TRB','AST','STL','BLK','TOV','PF','PTS','Plus']

//download ten game a time
var q = queue()

//load existing games
var dates = JSON.parse(fs.readFileSync('dates.json', 'utf8'))

//don't update days with already loaded scores
var games = []
dates.forEach(function(day){
  if (!day.games) return
  day.games.forEach(function(game){
    if (game.home) return
    games.push(game)
  })
})
console.log(games.length)

games.filter(function(d){ return !d.away }).forEach(function(game, i){
  if (i > 8000) return
  q.defer(getBoxFromGame, game)
})

q.awaitAll(function(err){
  fs.writeFile('dates.json', JSON.stringify(dates))
})


function getBoxFromGame(game, cb){
  var url = 'http://www.basketball-reference.com/' + game.url

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      game.home = game.url.slice(-8, -5)
      game.away = $('.align_center.background_yellow a').text().replace(game.home, '').slice(0, 3)

      game.players = []
      ;[game.home, game.away].forEach(function(teamStr){
        $('#' + teamStr + '_basic tbody tr')
            .filter(function(i){ return i != 5 })
            .each(function(){ addPlayerRow(this, teamStr) })        
      })

      function addPlayerRow(el, teamStr){
        var player = {}
        $('td', el).each(function(i){
          player[columns[i]] = $(this).text().replace('Did Not Play', 0)
        })
        player.url = $('td a', el).attr('href')
        player.team = teamStr
        game.players.push(player)
      }

  	}
  	cb(null)
	})
}
