var fs = require('fs')
var d3 = require('d3')
var request = require('request')
var cheerio = require('cheerio')
var queue = require('queue-async')
var _ = require('underscore')


var dates = JSON.parse(fs.readFileSync('dates.json', 'utf8'))

var players = []
dates.forEach(function(day){
  if (!day.games) return
  day.games.forEach(function(game){
    if (!game.players) return
    game.players.forEach(function(player){
      player.month    = day.str.split('=')[1].split('&')[0]
      player.day      = day.str.split('=')[2].split('&')[0]
      player.year     = day.str.split('=')[3].split('&')[0]
      player.home     = game.home
      player.away     = game.away
      players.push(player)
    })
  })
})

fs.writeFile('boxes.csv', d3.csv.format(players))