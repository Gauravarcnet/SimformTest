const mongoose = require('mongoose')

/* 
    Success and errors are the response method that we have defined 
    already in response So we can follow standward way and error handling
*/

const {
  success,
  errors
} = require('../../utils').response
const Organization = require('./organization.model')

function PostCtrl() {
  const methods = {

    addOrganization: async (req, res) => {
      try {

        /* 
        adding a new organization 
        */
        let data = req.body
        let newOrganization = new Organization({
          name: data.organization,
          type: data.type || 'IT',
          location: data.location || 'Bengaluru',
          size: data.size || 100
        })
        await newOrganization.save()
        return success(res, 201, newOrganization, "new organization added ")

      } catch (e) {
        console.log(e)
        return errors(res, 500, e)
      }
    },
    organizationList: async (req, res) => {

      try {
        let skip = parseInt(req.query.skip) || 0,
          limit = parseInt(req.query.limit) || 10
        organizationList = await Organization.aggregate([
          {
            $project: {
              "name": 1,
              "location": 1,
              "size": 1,
              "established": 1,
              "type": 1
            }
          },
          { $skip: skip }, { $limit: limit }
        ])
        return success(res, 200, organizationList, 'organization list data')
      } catch (e) {
        console.log(e)
        return errors(res, 500, e)
      }
    },


  }
  return Object.freeze(methods)
}

module.exports = PostCtrl()
/** */