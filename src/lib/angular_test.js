angular.module('myapp', []).controller('contrl', function ($scope) {
  $scope.intro = 'hello  world';
  $scope.name = 'kay';
  $scope.clickHandler = function () {
    console.log($scope);
  };
  $scope.list = [1,2,3]
  $scope.$watch("list",function(){
    console.log(123);
  })
});
