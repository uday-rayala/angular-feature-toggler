var app = angular.module('feature-toggler', []);

app.constant('enabledFeatures', ["Default Enabled 1", "Default Enabled 2"]);

app.service('featureToggleService', function(enabledFeatures, $rootScope) {
    var self = this;

    var features = sessionStorage.featuresOverride ?
        JSON.parse(sessionStorage.featuresOverride) :
        [];

    if(features.length === 0) {
        features = enabledFeatures.map(function(name){
            return {
                name: name,
                status: true
            };
        });
    }

    var updateLocalStorage = function() {
        sessionStorage.featuresOverride = angular.toJson(features);
    };

    var addFeature = function(name, status) {
        if(name && name.length > 0) {
            features.push({name: name, status: status});
            updateLocalStorage();
        }
    };

    return {
        features: features,
        addFeature: addFeature,
        toggle: function(feature) {
            feature.status = !feature.status;
            updateLocalStorage();
        },
        isEnabled: function(name) {
            for(var i=0; i< features.length; i++) {
                var feature = features[i];

                if (feature.name === name) {
                    return feature.status;
                }

                $rootScope.$emit('feature-added');
            };

            addFeature(name, false);
            return false;
        }
    };
});

app.directive('featureToggler', function(featureToggleService, $rootScope) {
    return {
        restrict: 'E',
        link: function(scope) {
            scope.features = featureToggleService.features;
            scope.toggle = featureToggleService.toggle;
            scope.add = function() {
                featureToggleService.addFeature(scope.newFeature, true);
                scope.newFeature = "";
            };

            $rootScope.$on('feature-added', function() {
                scope.$apply();
            });
        },

        template: '<div id="feature-toggler">' +
            '<span>Feature Toggles</span>' +
            '<ul>' +
            '<li ng-repeat="f in features" ng-click="toggle(f)">' +
            '{{f.name}}:' + '{{f.status}}' +
            '</li>' +
            '<li>' +
            '<input type="text" ng-model="newFeature">' +
            '<button ng-click="add()">Add</button>' +
            '</li>' +
            '</ul>' +
            '</div>'
    };
});
