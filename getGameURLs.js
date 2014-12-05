var fs = require('fs')
var d3 = require('d3')
var request = require('request')
var cheerio = require('cheerio')

var dateFmt = d3.time.format('month=%m&day=%d&year=%Y')

d3.time.days(dateFmt.parse('month=7&day=1&year=1985'), new Date(), 1).forEach(function(d){
  console.log(dateFmt(d))
})

function getGamesFromDate(cb, dateStr){
  var url = 'http://www.basketball-reference.com/boxscores/index.cgi?' + dateStr

  request(url, function(error, response, html){
    if(!error){
      var rv = []
      var $ = cheerio.load(html);
      $('.stw .align_right.bold_text a').each(function(i, this){
        rv.push()
      })
        // To write to the system we will use the built in 'fs' library.
        // In this example we will pass 3 parameters to the writeFile function
        // Parameter 1 :  output.json - this is what the created filename will be called
        // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
        // Parameter 3 :  callback function - a callback function to let us know the status of our function

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
          console.log('File successfully written! - Check your project directory for the output.json file');
        })
  })
})


}