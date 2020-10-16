import app from '../../src/app';

describe('\'wsPush\' service', () => {
  it('registered the service', () => {
    const service = app.service('ws-push');
    expect(service).toBeTruthy();
  });
});
