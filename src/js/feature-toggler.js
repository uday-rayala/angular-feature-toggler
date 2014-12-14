var app = angular.module('feature-toggler', []);

app.constant('enabledFeatures', ["default-enabled-1", "default-enabled-2"]);

app.service('featureToggleService', function(enabledFeatures, $rootScope) {
    var self = this;

    var localFeatures = function() {
        return sessionStorage.featuresOverride ?
            JSON.parse(sessionStorage.featuresOverride) :
            [];
    };

    var updateLocalStorage = function() {
        sessionStorage.featuresOverride = angular.toJson(features);
    };

    var addFeature = function(name, status) {
        if(name && name.length > 0) {
            features.push({name: name, status: status});
            updateLocalStorage();
        }
    };

    var features = localFeatures();

    if(features.length === 0) {
        features = enabledFeatures.map(function(name){
            return {
                name: name,
                status: true
            };
        });
    }

    return {
        features: features,
        addFeature: addFeature,
        isDevMode: function() {
            return window.location.hash === "#dev" || window.location.hash === "#/dev";
        },
        toggle: function(feature) {
            feature.status = !feature.status;
            updateLocalStorage();
        },
        clear: function() {
            features.length = 0;
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
            scope.show = featureToggleService.isDevMode();
            scope.features = featureToggleService.features;
            scope.showFeatures = false;
            scope.newFeature = "";
            scope.toggle = featureToggleService.toggle;
            scope.clear = function() {
                featureToggleService.clear();
                scope.showFeatures = false;
            };

            scope.toggleFeaturesPanel = function() {
                scope.showFeatures = !scope.showFeatures;
            };

            scope.add = function() {
                featureToggleService.addFeature(scope.newFeature, true);
                scope.newFeature = "";
            };

            $rootScope.$on('feature-added', function() {
                scope.$apply();
            });
        },

        template: '<div id="feature-toggler" ng-if="show">' +
            '<ul ng-if="showFeatures">' +
            '<li>' +
            '<input type="text" ng-model="$parent.newFeature">' +
            '<button ng-click="add()">Add</button>' +
            '</li>' +
            '<li>' +
            '<button ng-click="clear()">Clear All</button>' +
            '</li>' +
            '<li ng-repeat="f in features" ng-click="toggle(f)">' +
            '<span ng-class="{selected: f.status}"></span>' +
            '{{f.name}}' +
            '</li>' +
            '</ul>' +
            '<span ng-click="toggleFeaturesPanel()">' +
            'Feature Toggles' +
            '</span>' +
            '</div>'
    };
});
