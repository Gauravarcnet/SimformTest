const Joi = require('joi')
/* 
    Success and errors are the response method that we have defined 
    already in response So we can follow standward way and error handling
*/
const {
  success,
  errors
} = require('../../utils').response


function validationCtrl() {
  const methods = {

    signUpValidation: async (req, res, next) => {
      try {
        console.log("req", req);

        let data = req.body,
          schema = Joi.object().keys({
            name: Joi.string()
              .trim()
              .required(),
            password: Joi.string()
              .trim(),
            email: Joi.string()
              .email()
              .trim()
              .required(),
            organization: Joi.string()
          })

        let {
          error,
          value
        } = Joi.validate(data, schema, {
          abortEarly: false
        })

        if (error) return errors(res, 400, 'parameters are missing', error.details.map(x => x.message));
        req.value = value
        next()

      } catch (e) {
        return errors(res, 500, e)
      }
    },
    signInValidation: async (req, res, next) => {
      try {
        let schema = Joi.object().keys({
          email: Joi.string()
            .trim()
            .label('email'),
          password: Joi.string()
            .trim()
            .label('password')
            .required()
        })

        let {
          error,
          value
        } = Joi.validate(req.body, schema, {
          abortEarly: false
        })

        if (error) return errors(res, 400, 'parameters are missing', error.details.map(x => x.message))
        else {
          req.value = value
          next()
        }
      } catch (e) {
        return success(res, 500, e)
      }
    },
  }

  return Object.freeze(methods)
}

module.exports = validationCtrl()
