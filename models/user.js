var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

	//IRL Info
	firstName: String,
	lastName: String,
	email: String,
	college: String,
	
	//Site profile info
	loginUser: String,
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
	},
	
	//Admin info
	lastUpdate: Date
});

module.exports = mongoose.model('User', userSchema);