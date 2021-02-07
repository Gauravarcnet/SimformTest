function userRoutes() {
  const ctrl = require('./user.controller'),
    validationCtrl = require('./user.validator')
  return (open, closed) => {

    //  Using Joi as middlwware before sending req to controller
    open.route('/signUp').post(validationCtrl.signUpValidation, ctrl.createUser)
    open.route('/login').post(validationCtrl.signInValidation, ctrl.signIn)
    closed.route('/user').get(ctrl.userList)
    closed.route('/user').put(ctrl.editUser)
    closed.route('/user').delete(ctrl.deleteUser)
  }
}

module.exports = userRoutes()