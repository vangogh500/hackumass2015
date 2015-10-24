var http = require('http');

var apiToken = '7d6620b3-bb57-48fc-8c86-25e607cb9e72';

function makeRequest(opts, callback) {
	http.request(opts, function(res) {
		var data = '';
		res.on('data', function(chunk) {
			data += chunk;
		});
		res.on('error', function(e) {
			console.log(e);
		});
		res.on('end', function() {
			console.log(opts.path + " : " + res.statusCode);
			callback(JSON.parse(data));
		});
	}).end();
}


exports.getSummonerID = function(summonerName, cb){
	var opts = {
			hostname: 'na.api.pvp.net',
			method: 'GET',
			path: '/api/lol/na/v1.4/summoner/by-name/' + summonerName,
			headers: {
				'X-Riot-Token': apiToken
			}
	}
	makeRequest(opts, cb);
};

exports.getSummonerRank = function(summonerID, cb){
	var opts = {
			hostname: 'na.api.pvp.net',
			method: 'GET',
			path: '/api/lol/na/v2.5/league/by-summoner/' + summonerID + '/entry',
			headers: {
				'X-Riot-Token': apiToken
			}
	}
	makeRequest(opts, cb);
};