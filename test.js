import chai, { expect } from 'chai';
import fetchMock from 'fetch-mock';
import chaiFetchMock from './';

before(() => {
  fetchMock
    .get('/cats', { hi: 'hi' })
    .post('/dogs', { bye: 'bye' })
  chai.use(chaiFetchMock);
});

describe('route()', () => {
  it('sets an internal flag', () => {
    expect(fetchMock).route('/cats');
  });

  it('does not work on non-fetch-mock objects', () => {
    expect(() => expect({}).route('/cats')).to.throw(Error);
  });

  it('does not work on non-existent routes', () => {
    expect(() => expect(fetchMock).route('/nope')).to.throw(Error);
  });
});

describe('called', () => {
  beforeEach(fetchMock.reset);

  it('passes if a route has been called', () => {
    return fetch('/cats').then(() => {
      expect(() => {
        expect(fetchMock).route('/cats').to.have.been.called;
      }).to.not.throw(Error);
    });
  });

  it('fails if a route has not been called', () => {
    expect(() => {
      expect(fetchMock).route('/cats').to.have.been.called;
    }).to.throw(Error);
  });
});

describe('args', () => {
  const args = {
    method: 'post',
    body: {
      doggos: true
    }
  }

  beforeEach(fetchMock.reset);

  it('passes if a route was called with arguments', () => {
    return fetch('/dogs', args).then(() => {
      expect(() => {
        expect(fetchMock).route('/dogs').to.have.been.called.with.args(['/dogs', args]);
      }).to.not.throw(Error);
    });
  });

  it('fails if a route does not have exact arguments', () => {
    return fetch('/dogs', Object.assign({}, args, { puppers: true })).then(() => {
      expect(() => {
        expect(fetchMock).route('/dogs').to.have.been.called.with.args(['/dogs', args]);
      }).to.throw(Error);
    });
  });
});
