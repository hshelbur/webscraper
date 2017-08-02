var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){

	url = 'http://www.essie.com/Colors.aspx';

	request(url, function(error, response, html){
		if(!error){

			var $ = cheerio.load(html);

			var name, color;
			var json = {brand : 'Essie', name : '', color : ''};

			$('.header').filter(function(){
				var data = $(this);

				name = data.children('a').text();
				color = data.children('a').attr('style');

				json.name = name;
				json.color = color;
			})
		}

		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    		console.log('File successfully written! - Check your project directory for the output.json file');
		})

		res.send('Check your console!')
	})

})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;