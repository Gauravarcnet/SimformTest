const Joi = require('joi')
/* 
    Success and errors are the response method that we have defined 
    already in response So we can follow standward way and error handling
*/
const {
  errors
} = require('../../utils').response

function validationCtrl() {
  const methods = {

    postValidation: async (req, res, next) => {
      try {

        let data = req.body
        console.log(data);

        schema = Joi.object().keys({
          title: Joi.string()
            .trim()
            .required(),
          post: Joi.string()
            .trim()
            .required
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
    }
  }

  return Object.freeze(methods)
}

module.exports = validationCtrl()
