app.controller('IndexController', function($scope, $window){
  $scope.choice = {};
  $scope.choices = [
    { name: 'University of Massachusetts Amherst (UMASS)', detail: 'Amherst, MA', id: 'umass'},
    { name: 'Boston University (BU)', detail: 'Boston, MA'}
  ];
  function update(id, yLabel) {
    console.log("test");
    $window.location.href = '#school';
  }
  
  $scope.$watch('choice.selected', function(chosen) {
    if(chosen) update(chosen.key, chosen.detail);
  });
});