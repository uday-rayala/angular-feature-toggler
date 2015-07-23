describe('directive: toggleIf', function() {
    beforeEach(module('feature-toggler'));

    var $rootScope, $compile, sandBox, featureToggleService;

    beforeEach(inject(function(_$rootScope_, _$compile_,_featureToggleService_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        featureToggleService = _featureToggleService_;
        sandBox = sinon.sandbox.create();
    }));

    afterEach(function(){
        sandBox.restore();
    });

    it("should remove toggled element when toggle is off",
       inject(function() {
           sandBox.stub(featureToggleService,'isEnabled').withArgs('show-some-toggle').returns(false);

           var element = '<div><span toggle-if="show-some-toggle">Toggled Text</span></div>';
           var scope = $rootScope.$new();

           element = $compile(element)(scope);
           scope.$digest();

           expect(element.find('span').text()).toBe('');
       }));

    it("should include toggled element when toggle is on",
       inject(function() {
           sandBox.stub(featureToggleService,'isEnabled').withArgs('show-some-toggle').returns(true);

           var element = '<div><span toggle-if="show-some-toggle">Toggled Text</span></div>';
           var scope = $rootScope.$new();

           element = $compile(element)(scope);
           scope.$digest();

           expect(element.find('span').text()).toBe('Toggled Text');
       }));
});
