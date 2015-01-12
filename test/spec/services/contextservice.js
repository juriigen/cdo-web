'use strict';

describe('Service: ContextService', function () {

  // load the service's module
  beforeEach(module('cdoWebApp'));

  // instantiate service
  var ContextService;
  beforeEach(inject(function (_ContextService_) {
    ContextService = _ContextService_;
  }));

  it('should do something', function () {
    expect(!!ContextService).toBe(true);
  });

});
