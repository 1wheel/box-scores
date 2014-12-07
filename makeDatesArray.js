var fs = require('fs')
var d3 = require('d3')
var request = require('request')
var cheerio = require('cheerio')
var _ = require('underscore')
var f = require('./f.js')

var dateFmt = d3.time.format('month=%m&day=%d&year=%Y')

var dates = JSON.parse(fs.readFileSync('dates.json', 'utf8'));

var dateStrs = dates.map(f('str'))

d3.time.days(dateFmt.parse('month=8&day=1&year=1985'), new Date(), 1).forEach(function(d){
	if (!_.contains(dateStrs, dateFmt(d))){
		dates.push({str: dateFmt(d)})
	}
})

fs.writeFile('dates.json', JSON.stringify(dates, null, 4))