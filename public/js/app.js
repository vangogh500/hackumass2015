var app = angular.module('UniLol', ['ngRoute']);

app.config(function($routeProvider) { 
  $routeProvider 
    .when('/', { 
      templateUrl: 'views/index.html',
      controller: 'indexController'
    })
    .otherwise({ 
      redirectTo: '/' 
    }); 
});