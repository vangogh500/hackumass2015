var riotjs = require('./riot.js');


/*riotjs.getSummonerID('Ayuu', function(data){
	console.log(data);
});*/

riotjs.getSummonerInfo(37738212, function(data){
	console.log(data);
});