'use strict';

describe('Controller: GovareasCtrl', function () {

  // load the controller's module
  beforeEach(module('cdoWebApp'));

  var GovareasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GovareasCtrl = $controller('GovareasCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
