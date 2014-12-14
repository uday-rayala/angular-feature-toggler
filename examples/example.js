var app = angular.module('example', ["feature-toggler"]);

app.controller('exampleController', function($scope, featureToggleService) {
    $scope.isDevMode = featureToggleService.isDevMode();
    $scope.currentUrl = window.location.href;
});
