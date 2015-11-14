'use strict';

describe('Controller: IfmscorbaCtrl', function () {

  // load the controller's module
  beforeEach(module('cdoWebApp'));

  var IfmscorbaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IfmscorbaCtrl = $controller('IfmscorbaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
