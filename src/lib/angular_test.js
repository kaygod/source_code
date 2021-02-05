angular.module('myapp', []).controller('contrl', function ($scope) {
  $scope.intro = 'hello  world';
  $scope.name = 'kay';
  $scope.clickHandler = function () {
    console.log('点击了');
  };
});
