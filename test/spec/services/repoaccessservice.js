'use strict';

describe('Service: RepoAccessService', function () {

  // load the service's module
  beforeEach(module('cdoWebApp'));

  // instantiate service
  var RepoAccessService;
  beforeEach(inject(function (_RepoAccessService_) {
    RepoAccessService = _RepoAccessService_;
  }));

  it('should do something', function () {
    expect(!!RepoAccessService).toBe(true);
  });

});
