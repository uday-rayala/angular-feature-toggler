describe("FeatureToogleService", function() {
    var mockWindow;

    beforeEach(module('feature-toggler'));
    beforeEach(function() {
        mockWindow = {location: {hash: ""}};
        module(function($provide) {
            $provide.value('$window', mockWindow);
        });
    });

    describe("isDevMode", function() {
        it("should return true if location hash ends with dev",
           inject(function(featureToggleService) {
               mockWindow.location.hash = "#dev";
               expect(featureToggleService.isDevMode()).toBe(true);
           }));
    });
});
