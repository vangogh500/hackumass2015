var app = angular.module('UniLol', ['ui.select', 'ngRoute']);

app.config(function($routeProvider) { 
  $routeProvider 
    .when('/', { 
      templateUrl: 'views/index.html',
      controller: 'IndexController'
    })
    .when('/school/:schoolID', {
      templateUrl: 'views/school.html',
      controller: 'SchoolController'
    })
    .otherwise({ 
      redirectTo: '/' 
    }); 
});