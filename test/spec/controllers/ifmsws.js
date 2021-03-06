'use strict';

describe('Controller: IfmswsCtrl', function () {

  // load the controller's module
  beforeEach(module('cdoWebApp'));

  var IfmswsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IfmswsCtrl = $controller('IfmswsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
