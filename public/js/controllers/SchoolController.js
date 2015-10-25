app.controller('SchoolController', function($scope, $routeParams, $http){
	var schoolID = $routeParams.schoolID;
	$http({
	  method: 'GET',
	  url: '/api/user/' + schoolID
	}).then(function successCallback(response) {
		if(response.data) {
			$scope.players = response.data;
			$scope.players.forEach(function(player) {
				var tier;
				switch(player.rankSoloQ.tier) {
					case 0:
						tier = "Bronze";
						break;
					case 1:
						tier = "Silver";
						break;
					case 2:
						tier = "Gold";
						break;
					case 3:
						tier = "Platinum";
						break;
					case 4:
						tier = "Diamond";
						break;
					case 5:
						tier = "Master";
						break;
					case 6:
						tier = "Challenger";
						break;
					default:
						tier = "Error"
						break;
				};
				var division;
				switch(player.rankSoloQ.division) {
					case 0:
						division = "I";
						break;
					case 1:
						division = "II";
						break;
					case 2:
						division = "III";
						break;
					case 3:
						division = "IV";
						break;
					case 4:
						division = "V";
						break;
					default:
						division = "Error"
						break;
				};
				player.divStr = division;
				player.tierStr = tier;
			});
			console.log($scope.players);
		}
	}, function errorCallback(response) {
	    console.log(response);
	});
});