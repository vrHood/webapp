import assert from 'assert';
import app from '../../src/app';

describe('\'retailers\' service', () => {
  it('registered the service', () => {
    const service = app.service('retailers');

    assert.ok(service, 'Registered the service');
  });
});
