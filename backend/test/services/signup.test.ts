import assert from 'assert';
import app from '../../src/app';

describe('\'signup\' service', () => {
  it('registered the service', () => {
    const service = app.service('signup');

    assert.ok(service, 'Registered the service');
  });
});
