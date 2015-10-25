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
		
		var tierNum = null;
		var divNum = null;

		var tier;
		if (d[0].queue === 'RANKED_SOLO_5x5'){
			tier = d[0].tier;
		}
		
		var division;
		if (d[0].queue === 'RANKED_SOLO_5x5'){
			division = d[0].entries[0].division;
		}
				
		var lp = -1;
		if (d[0].queue === 'RANKED_SOLO_5x5'){
			lp = d[0].entries[0].leaguePoints;
		}
		
		
		switch(tier){
			case 'BRONZE': tierNum = 0; break;
			case 'SILVER': tierNum = 1; break;
			case 'GOLD': tierNum = 2; break;
			case 'PLATINUM': tierNum = 3; break;
			case 'DIAMOND': tierNum = 4; break;
			case 'MASTER': tierNum = 5; break;
			case 'CHALLENGER': tierNum = 6; break;
			default: -1; //unranked
		}
		
		switch(division){
			case 'I': divNum = 0; break;
			case 'II': divNum = 1; break;
			case 'III': divNum = 2; break;
			case 'IV': divNum = 3; break;
			case 'V': divNum = 4; break;
			default: -1; //unranked
		}
		
		var toReturn = {
			tier: tierNum,
			division: divNum,
			lp: lp
		};
		
		cb(toReturn);
	
	});
};