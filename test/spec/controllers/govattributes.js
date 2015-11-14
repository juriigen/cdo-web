'use strict';

describe('Controller: GovattributesCtrl', function () {

  // load the controller's module
  beforeEach(module('cdoWebApp'));

  var GovattributesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GovattributesCtrl = $controller('GovattributesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
