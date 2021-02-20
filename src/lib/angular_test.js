angular.module('myapp', []).controller('contrl', function ($scope) {
  $scope.name = 'hello world';
  $scope.clickHanlder = function () {
    $scope.name = $scope.name + '!';
  };
});
