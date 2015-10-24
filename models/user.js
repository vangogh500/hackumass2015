var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

	//IRL Info
	firstName: String,
	lastName: String,
	email: String,
	college: String,
	
	//Site profile info
	status: String,

	//In-game info
	ign: String,
	userID: String,
	favRole: String,
	favChampion: String,

	//Rank info
	rankSoloQ: {
		tier: String,
		division: String,
		lp: Number
	}
	
	rankTeam5v5: {
		teamname: String
		tier: String,
		division: String,
		lp: Number
	}
	
	rankTeam3v3: {
		teamname: String
		tier: String,
		division: String,
		lp: Number
	}
	
	//Admin info
	lastUpdate: Date,
});

var User = mongoose.model('User', userSchema);
module.exports = User;