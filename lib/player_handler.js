var Player = require('../models/user.js');
var riotjs = require('./riot.js');

exports.formatPlayer = function(playerName, cb) {
	console.log("\t Searching for player: " + playerName + "...");
	Player.findOne({ ign: playerName }, function(err, found) {
		if(err) console.error(err);
		if(found) {
			console.log("\t \t Player found!");
			
				if(err) console.error(err);
				if(updated) console.log("\t \t Player was not associated with team and was added to the team roster");
				else console.log("\t \t Player was already associated with the team!");
			
		}
		else {
			console.log("\t \t Player not found. Adding to database...");
			var toAdd = new Player({
			
				//IRL Info
				firstName:				'Joshua',
				lastName:				'Espinosa',
				email:					'espinosa@umass.edu',
				college:				'UMass Amherst',
				
				//Site profile info
				status:					'Hauu~ Uguu~',

				//In-game info
				ign:					playerName,
				userID:					riotjs.getSummonerID(playerName),
				favRole:				'Support',
				favChampion:			'Lulu',

				//Rank info
				rankSoloQ: {
					tier: 				riotjs.getSummonerTier(playerName),
					division: 			riotjs.getSummonerDivision(playerName),
					lp: 				riotjs.getSummonerLeaguePoints(playerName)
				},
				
				//Admin info
				lastUpdate:				new Date('<2015-10-24>')	
				
			}).save(function(err) {
					if(err) console.error(err);
				});
		}
		
	});
};