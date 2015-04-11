f = d3.f

d3.json('../dates.json', function(dates){
  data = dates
})


d3.csv('../boxes.csv', function(res){
  data = res

  byPlayers = d3.nest().key(f('url')).entries(data)

  byPlayers = _.sortBy(byPlayers, f('values', 'length'))
})