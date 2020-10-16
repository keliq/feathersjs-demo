import app from '../../src/app';

describe('\'book\' service', () => {
  it('registered the service', () => {
    const service = app.service('books');
    expect(service).toBeTruthy();
  });
});
