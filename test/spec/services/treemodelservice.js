'use strict';

describe('Service: TreeModelService', function () {

  // load the service's module
  beforeEach(module('cdoWebApp'));

  // instantiate service
  var TreeModelService;
  beforeEach(inject(function (_TreeModelService_) {
    TreeModelService = _TreeModelService_;
  }));

  it('should do something', function () {
    expect(!!TreeModelService).toBe(true);
  });

});
