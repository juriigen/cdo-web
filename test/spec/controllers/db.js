'use strict';

describe('Controller: DbCtrl', function () {

  // load the controller's module
  beforeEach(module('cdoWebApp'));

  var DbCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DbCtrl = $controller('DbCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
