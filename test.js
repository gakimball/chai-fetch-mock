import chai, { expect } from 'chai';
import fetchMock from 'fetch-mock';
import chaiFetchMock from './';

before(() => {
  fetchMock.get('*', { hi: 'hi' });
  chai.use(chaiFetchMock);
});

describe('route()', () => {
  it('sets an internal flag', () => {
    expect(fetchMock).route('*');
  });

  it('does not work on non-fetch-mock objects', () => {
    expect(() => expect({}).route('*')).to.throw(Error);
  });

  it('does not work on non-existent routes', () => {
    expect(() => expect(fetchMock).route('nope')).to.throw(Error);
  });
});

describe('called', () => {
  beforeEach(fetchMock.reset);

  it('passes if a route has been called', () => {
    return fetch('/cats').then(() => {
      expect(() => {
        expect(fetchMock).route('*').to.have.been.called;
      }).to.not.throw(Error);
    });
  });

  it('fails if a route has not been called', () => {
    expect(() => {
      expect(fetchMock).route('*').to.have.been.called;
    }).to.throw(Error);
  });
});
