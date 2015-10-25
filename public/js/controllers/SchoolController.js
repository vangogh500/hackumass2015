app.controller('SchoolController', function($scope, $routeParams, $http){
	var schoolID = $routeParams.schoolID;
	$http({
	  method: 'GET',
	  url: '/api/user/' + schoolID
	}).then(function successCallback(response) {
		console.log(response.data);
		if(response.data) {
			$scope.players = response.data;
			$scope.players.forEach(function(player) {
				var tier;
				switch(player.rankSoloQ.tier) {
					case 0:{
						tier = "Unranked";
						break;}
					case 1:{
						tier = "Bronze";
						break;}
					case 2:{
						tier = "Silver";
						break;}
					case 3:{
						tier = "Gold";
						break;}
					case 4:{
						tier = "Platinum";
						break;}
					case 5:{
						tier = "Diamond";
						break;}
					case 6:{
						tier = "Master";
						break;}
					case 7:{
						tier = "Challenger";
						break;}
					default:{
						tier = "Unranked";}
				};
				var division;
				switch(player.rankSoloQ.division) {
					case 0:{
						division = "";
						break;}
					case 5:{
						division = "I";
						break;}
					case 4:{
						division = "II";
						break;}
					case 3:{
						division = "III";
						break;}
					case 2:{
						division = "IV";
						break;}
					case 1:{
						division = "V";
						break;}
					default:{
						division = "";}
				};
				if(player.rankSoloQ.lp < 0) {
					player.rankSoloQ.lp = "";
				}
				player.divStr = division;
				player.tierStr = tier;
			});
			console.log($scope.players);
		}
	}, function errorCallback(response) {
	    console.log(response);
	});
});