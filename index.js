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
}
