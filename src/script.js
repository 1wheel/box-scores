f = d3.f

d3.json('../dates.json', function(res){
  dates = res
})


d3.csv('../boxes.csv', function(res){
  data = res

  data.forEach(function(d){
    d.min = +d.MP.split(':')[0] + (+d.MP.split(':')[1]/60)
    if (isNaN(d.min)) d.min = 0
  })
  byPlayer = d3.nest().key(f('url')).entries(data)
  byPlayer = _.sortBy(byPlayer, f('values', 'length'))
  byPlayer.forEach(function(d){
    d.min = d3.sum(d.values, f('min'))
    d.games = d.values.length
    d.name = d.values[0].Name
  })


  !(function(){
    var c = d3.conventions({parentSel: d3.select('#winDist')})

    c.x.domain(d3.extent(byPlayer, f('games')))
    c.y.domain(d3.extent(byPlayer, f('min')))
    c.drawAxis()
  
    c.svg.dataAppend(byPlayer, 'circle')  
        .attr({cx: f('games', c.x), cy: f('min', c.y)})
        .attr('r', 5)
        .style({opacity: .4, stroke: 'black', fill: 'grey'})
        .call(d3.attachTooltip)

  })()

})