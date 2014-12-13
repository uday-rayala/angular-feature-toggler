var app = angular.module('feature-toggles', []);

app.constant('enabledFeatures', ["Default Enabled 1", "Default Enabled 2"]);

app.service('featureToggleService', function(enabledFeatures, $rootScope) {
    var self = this;
    var features = enabledFeatures.map(function(name){
        return {
            name: name,
            status: true
        };
    });

    return {
        features: features,
        isEnabled: function(name) {
            for(var i=0; i< features.length; i++) {
                var feature = features[i];

                if (feature.name === name) {
                    return feature.status;
                }
            };

            features.push({name: name, status: false});
            $rootScope.$emit('feature-added');
            return false;
        },

        addFeatureChangeListener: function(listener) {
            featureChangedListeners.push(listener);
        }
    };
});

app.directive('featureToggler', function(featureToggleService, $rootScope) {
    return {
        restrict: 'E',
        link: function(scope) {
            scope.features = featureToggleService.features;
            $rootScope.$on('feature-added', function() {
                scope.$apply();
            });
        },

        template: '<div>' +
            '<span>Feature Toggles</span>' +
            '<ul>' +
            '<li ng-repeat="f in features" ng-click="f.status = !f.status">' +
            '{{f.name}}:' + '{{f.status}}' +
            '</li>' +
            '</ul>' +
            '</div>'
    };
});
