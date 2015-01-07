'use strict';

describe('Service: CalculateUrlService', function () {

  // load the service's module
  beforeEach(module('cdoWebApp'));

  // instantiate service
  var CalculateUrlService;
  beforeEach(inject(function (_CalculateUrlService_) {
    CalculateUrlService = _CalculateUrlService_;
  }));

  it('should do something', function () {
    expect(!!CalculateUrlService).toBe(true);
  });

});
