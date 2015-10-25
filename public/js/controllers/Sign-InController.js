app.controller('Sign-InController', function($scope, $routeParams, $http){
	console.log('test');
	$scope.verify = function() {
		$http({
		  method: 'POST',
		  url: '/api/user/' + $scope.username + '/' + $scope.ign
		}).then(function successCallback(response) {
			console.log(response);
		    // this callback will be called asynchronously
		    // when the response is available
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log(response);
		});
		
	};
});