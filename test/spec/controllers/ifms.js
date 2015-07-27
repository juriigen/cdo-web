'use strict';

describe('Controller: IfmsCtrl', function () {

  // load the controller's module
  beforeEach(module('cdoWebApp'));

  var IfmsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IfmsCtrl = $controller('IfmsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
