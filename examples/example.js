var app = angular.module('example', ["feature-toggles"]);

app.controller('ExampleController', function($scope) {
    $scope.features = ["Feature 1", "Feature 2"];
});
