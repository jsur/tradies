/* eslint-env chai, mocha */

const chai = require('chai');

const { expect } = chai;
const { log } = require('../helpers/logger');

describe('logger', () => {
  it('Should export a logger object with an info function', () => {
    expect(typeof log).to.equal('object');
    expect(typeof log.info).to.equal('function');
  });
  it('Should export a logger object with an error function', () => {
    expect(typeof log).to.equal('object');
    expect(typeof log.error).to.equal('function');
  });
});