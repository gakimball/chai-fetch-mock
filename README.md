# chai-fetch-mock

> Chai plugin for fetch-mock library

## Installation

```bash
npm install chai-fetch-mock
```

## Usage

```js
import chai from 'chai';
import chaiFetchMock from 'chai-fetch-mock';
import fetchMock from 'fetch-mock';

chai.use(chaiFetchMock);

describe('test', () => {
  before(() => fetchMock.get('/cats', { cats: 5 }))

  it('calls fetch', () => {
    return fetch('/cats').then(() => {
      expect(fetchMock).route('/cats').to.have.been.called;
    });
  });

  after(() => fetchMock.restore());
});
```

## License

MIT &copy; [Geoff Kimball](http://geoffkimball.com)
