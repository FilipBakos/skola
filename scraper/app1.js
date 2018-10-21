const request = require('request');
const cheerio = require('cheerio');

request('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects', function (error, response, body) {
	if (!error && response.statusCode == 200){

	    var $ = cheerio.load(body);
	    
	   	$('#quick-links > ol > li:nth-child(8) > details > ol > li > a')
	   	.each(function(index, element1) {
	   		if($(element1).text().indexOf('Function') === -1)
	   		request('https://www.javascripture.com/' + $(element1).text(), function(error1, response1, body1) {
	   			if (!error1 && response.statusCode == 200){
	   				var name=$(element1).text();
		   			var $1 = cheerio.load(body1);

		   			$1('.member .declaration').each(function(index, b) {
		   				findFunction(name, $1,b);
		   			});
		   		}

	   		});	

	    });
	};
});

const findFunction = (name, body,element) => {
	var string = body(element).text();
	if(string.indexOf("Function") >= 0 && string.indexOf("new") === -1 && string.indexOf("constructor") === -1 ){
		 console.log("|-> " + name + "." + body(element).text());
	}
};
