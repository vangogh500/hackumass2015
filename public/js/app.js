var app = angular.module('UniLol', ['ui.select', 'ngRoute']);

app.config(function($routeProvider) { 
  $routeProvider 
    .when('/', { 
      templateUrl: 'views/index.html',
      controller: 'IndexController'
    })
    .when('/school', {
      templateUrl: 'views/school.html',
      controller: 'IndexController'
    })
    .otherwise({ 
      redirectTo: '/' 
    }); 
});