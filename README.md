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

## API

### route(matcher)

Sets up an assertion to check calls to a specific matcher. This is either the URL of the route, or the custom name of the route. Use this before any other fetch-mock assertion.

```js
// Default name
fetchMock.get('*', {});
expect(fetchMock).route('*');

// Custom name
fetchMock.get(/.*/, {}, { name: 'all' });
expect(fetchMock).route('all');
```

This function on its own only asserts that the mock route exists.

### called

Asserts that `fetch()` was used to call a specific route at least once.

```js
expect(fetchMock).route('*').to.have.been.called;
expect(fetchMock).route('*').to.not.have.been.called;
```

This method can be chained to the ones below, allowing you to check if a route was called *and* if it was called with specific properties in one assertion.

### args

Asserts that the arguments of last call to `fetch()` to a specific route deeply equal `value`.

```js
getCat(1).then(() => {
  expect(fetchMock).route('/cats/get').to.have.been.called.with.args(['/cats/get', { id: 1 }]);
});
```

### args

Asserts that the URL of last call to `fetch()` to a specific route equals `value`.

```js
getDoggo(2).then(() => {
  expect(fetchMock).route('/doggos/get').to.have.been.called.with.url('/doggos/get/2');
});
```

### options

Asserts that the options of last call to `fetch()` to a specific route deeply equal `value`.

```js
getDoggo(2).then(() => {
  expect(fetchMock).route('/doggos/get').to.have.been.called.with.options({ mode: 'same-origin' });
});
```

## License

MIT &copy; [Geoff Kimball](http://geoffkimball.com)
