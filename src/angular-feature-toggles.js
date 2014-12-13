var app = angular.module('feature-toggles', []);

app.factory('FeatureToggle', function(features) {
    return {};
});

app.directive('featureToggler', function() {
    return {
        restrict: 'E',
        template: '<ul></ul>'
    };
});
