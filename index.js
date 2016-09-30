const deepEqual = require('deep-equal');
const find = require('lodash.find');

/**
 * Creates BDD assertions for use with Chai and fetch-mock.
 * @param {Chai} chai - Chai instance.
 * @param {Object} utils - Chai utilities.
 */
module.exports = (chai, utils) => {
  const { Assertion } = chai;

  /**
   * Enables use of fetch-mock assertions farther down the chain.
   * @param {String} str - Route to examine.
   * @throws {AssertionError} A fetch-mock object is not being examined.
   * @throws {AssertionError} The given route doesn't exist on the fetch-mock object.
   */
  Assertion.addMethod('route', function(str) {
    // Check if the object is fetch-mock
    new Assertion(this._obj, `Expected ${this._obj} to be a fetch-mock object`).contain.keys(['fetchMock']);

    // Check if the route exists
    const routes = this._obj.routes.map(r => r.name);
    new Assertion(str, `Expected ${str} to be a fetch-mock route`).oneOf(routes);

    // Store the matcher as a flag
    utils.flag(this, 'fetchMock', str);
  });

  /**
   * Check if a route has been called at least once.
   * @throws {AssertionError} A route to test was not set with the `route()` function.
   */
  Assertion.addProperty('called', function() {
    // Need a route to test
    const route = utils.flag(this, 'fetchMock');
    if (!route) {
      new AssertionError('Cannot check if a route has been called without route() in the assertion.');
    }

    this.assert(
      this._obj.called(route) === true,
      `Expected route "${route}" to have been called`,
      `Expected route "${route}" to not have been called`
    );
  });

  /**
   * Check if a call to `fetch()` to a specific route was made with specific arguments.
   * @param {Array} args - Arguments to check.
   * @throws {AssertionError} A route to test was not set with the `route()` function.
   */
  Assertion.addMethod('args', function(args) {
    // Need a route to test
    const route = utils.flag(this, 'fetchMock');
    if (!route) {
      new AssertionError('Cannot check if a route has been called without route() in the assertion.');
    }

    const lastArgs = this._obj.lastCall(route);

    new Assertion(lastArgs).eql(args);
  });
}
