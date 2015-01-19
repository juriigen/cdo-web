'use strict';

describe('Directive: removeNode', function () {

  // load the directive's module
  beforeEach(module('cdoWebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<remove-node></remove-node>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the removeNode directive');
  }));
});
