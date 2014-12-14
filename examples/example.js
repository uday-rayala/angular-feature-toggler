var app = angular.module('example', ["feature-toggler"]);

app.constant('enabledFeatures', ["default-enabled-1", "default-enabled-2"]);

app.controller('exampleController', function($scope, featureToggleService) {
    $scope.isDevMode = featureToggleService.isDevMode();
    $scope.currentUrl = window.location.href;
    featureToggleService.isEnabled("enable-check");
});
