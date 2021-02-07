function articleRoutes() {
  const ctrl = require('./organization.controller'),
    validationCtrl = require('./organization.validator')
  return (open, closed) => {

    open.route('/organization').post(ctrl.addOrganization)
    open.route('/organization').get(ctrl.organizationList)
  }
}
module.exports = articleRoutes()