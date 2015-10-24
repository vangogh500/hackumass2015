var riotjs = require('./riot.js');

process.on('uncaughtException', function (err) {
    console.log(err);
});

riotjs.getSummonerID('Ayuu', function(data){
	console.log(data);
});
