function utils() {

  const methods = {
    /** Add Decorator fn to prefix router path's
     * @param  {Object} router
     * @returns {Object} router
     */
    log: require('./logging'),
    authenticate: require('./authenticate'),
    errorHandler: require('./errorHandler'),
    logging: require('./logging'),
    response: require('./response')
  };

  return Object.freeze(methods)
}

module.exports = utils()
