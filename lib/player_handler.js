var Player = require('../models/user.js');
var riotjs = require('./riot.js');


exports.removeProfile = function(loginUser, cb){
	console.log("\t Deleting player...");

	Player.remove({ loginUser: loginUser}, function(err){
		cb(err);
		console.log('Delete success!');
	});
}


exports.updateProfile = function(loginUser, firstNameValue, lastNameValue, emailValue, collegeValue, statusValue, ignValue, userIDValue, favRoleValue, favChampionValue, cb) {
    console.log("\t Updating player...");
    Player.findOne({ loginUser: loginUser }, function(err, u) {
        if (err) return res.send(500, 'Error occurred: database error');
		
		u.firstName = firstNameValue;
        u.lastName = lastNameValue;
		
		if (emailValue !== null)
			u.email = emailValue; //ADD VERIFICATION
			
        u.status = statusValue;
        u.college = collegeValue; //ADD VERIFICATION
		
		if (ignValue !== null)
			u.ign = ignValue;
			
		if (userIDValue !== null)
			u.userID = userIDValue;
			
        u.favRole = favRoleValue;
        u.favChampion = favChampionValue;
		
		u.save(function(err) {
			if(err) console.log('error');
			else console.log('success');
		});
		
		console.log("after update");
    });

};


exports.formatPlayer = function(loginUser, playerName, cb) {
    Player.findOne({
		loginUser: loginUser
    }, function(err, found) {
        if (found) cb("Error");
        else {
		riotjs.getSummonerID(playerName, function(id) {
			riotjs.getSummonerInfo(id, function(summInfo) {
				var toAdd = new Player({
				
				//IRL Info
				firstName: 'Joseph',
				lastName: 'Smith',
				email: 'UIU.edu',
				college: 'BYU',

				//Site profile info
				loginUser: loginUser,
				password: 'byebyebye',
				status: 'sadface',

				//In-game info
				ign: playerName,
				userID: id,
				favRole: 'Feeder',
				favChampion: 'Teemo',

				//Rank info
				rankSoloQ: {
					tier: summInfo.tier,
					division: summInfo.division,
					lp: summInfo.lp
				},

				//Admin info
				lastUpdate: new Date()

				});

				toAdd.save(function(err) {
					console.log("test");
					cb(err);
				});

			});
		});
        }
    });


};