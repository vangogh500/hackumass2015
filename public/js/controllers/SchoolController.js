app.controller('SchoolController', function($scope, $routeParams, $http){
	var schoolID = $routeParams.schoolID;
	$http({
	  method: 'GET',
	  url: '/api/user/' + schoolID
	}).then(function successCallback(response) {
		console.log(response);
	}, function errorCallback(response) {
	    console.log(response);
	});
	d3.json('data/' + $routeParams.schoolID + '.json', function(data) {
		$scope.players = data;
		$scope.$apply();
	});
});