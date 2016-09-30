import chai, { expect } from 'chai';
import fetchMock from 'fetch-mock';
import chaiFetchMock from './';

fetchMock.get('*', { hi: 'hi' });

before(() => {
  chai.use(chaiFetchMock);
});

describe('route()', () => {
  it('sets an internal flag', () => {
    expect(fetchMock).route('*');
  });

  it('does not work on non-fetch-mock objects', () => {
    expect(() => expect({}).route('*')).to.throw('AssertionError');
  });

  it('does not work on non-existent routes', () => {
    expect(() => expect(fetchMock).route('nope')).to.throw('AssertionError');
  });
});
