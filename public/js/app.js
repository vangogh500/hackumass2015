var app = angular.module('UniLol', ['ui.select', 'ngRoute']);

app.config(function($routeProvider) { 
  $routeProvider 
    .when('/', { 
      templateUrl: 'views/index.html',
      controller: 'IndexController'
    })
    .otherwise({ 
      redirectTo: '/' 
    }); 
});