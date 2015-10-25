app.controller('SchoolController', function($scope, $routeParams){
	console.log($routeParams.schoolID);
	d3.json('data/' + $routeParams.schoolID + '.json', function(data) {
		$scope.players = data;
		$scope.$apply();
	});
});