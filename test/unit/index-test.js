'use strict';

var request = require('supertest'),
    proxyquire = require('proxyquire');

var httpMock = {
    createServer: function() {
        var serverStub = {
            listen: function() {}
        };
        return serverStub;
    }
};

var app = proxyquire('../../lib/server', {
  'http': httpMock
});

describe('Demo server', function() {

  it('should serve a 200 OK response', function(done) {
    request(app)
        .get('/test')
        .expect(200)
        .end(done);
  });

});
