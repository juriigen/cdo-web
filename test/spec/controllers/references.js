'use strict';

describe('Controller: ReferencesCtrl', function () {

  // load the controller's module
  beforeEach(module('cdoWebApp'));

  var ReferencesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReferencesCtrl = $controller('ReferencesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
