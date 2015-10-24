var https = require('https');

var apiToken = '7d6620b3-bb57-48fc-8c86-25e607cb9e72';


function makeRequest(opts, callback) {
	https.request(opts, function(res) {
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
	makeRequest(opts, function(data) {
		cb(data[summonerName.toLowerCase()].id);
	});
};



//SOLO QUEUE ONLY
exports.getSummonerInfo = function(summonerID, cb){
	var opts = {
			hostname: 'na.api.pvp.net',
			method: 'GET',
			path: '/api/lol/na/v2.5/league/by-summoner/' + summonerID + '/entry',
			headers: {
				'X-Riot-Token': apiToken
			}
	}
	makeRequest(opts, function(data) {
		
		var d = data[summonerID];

		var tier;
		if (d[0].queue === 'RANKED_SOLO_5x5'){
			tier = d[0].tier;
		}
		
		var division;
		if (d[0].queue === 'RANKED_SOLO_5x5'){
			division = d[0].entries[0].division;
		}
				
		var lp;
		if (d[0].queue === 'RANKED_SOLO_5x5'){
			lp = d[0].entries[0].leaguePoints;
		}
		
		var toReturn = {
			tier: tier,
			division: division,
			lp: lp
		};
		
		cb(toReturn);
	
	});
};

exports.getSummonerDivision = function(summonerID, cb){
	var opts = {
			hostname: 'na.api.pvp.net',
			method: 'GET',
			path: '/api/lol/na/v2.5/league/by-summoner/' + summonerID + '/entry',
			headers: {
				'X-Riot-Token': apiToken
			}
	}
	makeRequest(opts, function(data) {
	
	var d = data[summonerID];
		
	});
};

exports.getSummonerLP = function(summonerID, cb){
	var opts = {
			hostname: 'na.api.pvp.net',
			method: 'GET',
			path: '/api/lol/na/v2.5/league/by-summoner/' + summonerID + '/entry',
			headers: {
				'X-Riot-Token': apiToken
			}
	}
	makeRequest(opts, function(data) {
	
	var d = data[summonerID];
		
		if (d[0].queue === 'RANKED_SOLO_5x5'){
			cb(d[0].entries[0].leaguePoints);
		}
		else
			cb(null);
	});
};