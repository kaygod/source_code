angular.module('myapp', []).controller('contrl', function ($scope) {
  $scope.name = 'hello world';
<<<<<<< HEAD
  $scope.clickHanlder = function () {
    $scope.name = $scope.name + '!';
  };
=======
  $scope.clickHandler = function(){
    $scope.name+="!";
  }
>>>>>>> 7c83cd8 (nothing)
});
