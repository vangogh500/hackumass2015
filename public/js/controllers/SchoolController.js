app.controller('SchoolController', function($scope, $routeParams){
	console.log($routeParams.schoolID);
	$http({
	  method: 'GET',
	  url: '/send/' + $scope.email + '/' + $scope.username + '/' + $scope.ign
	}).then(function successCallback(response) {
		if(response.data == 'error') {
			$scope.msg = "Email was invalid!";
	    	$scope.$apply;
		}
		else {
			$scope.msg = "Email was sent!";
			$scope.$apply;
		}
	}, function errorCallback(response) {
	    $scope.msg = "Oops! Something went wrong contacting the server!";
	    $scope.$apply;
	});
	d3.json('data/' + $routeParams.schoolID + '.json', function(data) {
		$scope.players = data;
		$scope.$apply();
	});
});