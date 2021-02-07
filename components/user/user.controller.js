const jwt = require('jsonwebtoken')
const User = require("./user.model")
const Organization = require("./../organization/organization.model")



/* 
    Success and errors are the response method that we have defined 
    already in response So we can follow standward way and error handling
*/
const {
  success,
  errors
} = require('../../utils').response

function userCtrl() {
  const methods = {

    // admin signup 
    createUser: async (req, res) => {
      try {
        let data = req.value

        let {
          generateHash
        } = new User() // destructing generateHash Method from userModel

        let searchQuery = {}
        if (data.email) {
          searchQuery = {}
          searchQuery.email = data.email
        }
        //Check user exist with particular email 
        let user = await User.findOne(searchQuery).lean()

        // If user already exist Response with 
        if (user) return errors(res, 400, 'User Already Exist')


        let newUser = new User({
          email: data.email,
          name: data.name || '',
          password: data.password ? generateHash(data.password) : '',
          organization: data.organization
        })

        await newUser.save()

        return success(res, 200, 'user created succesfully')

      } catch (e) {
        console.log(e)
        throw new Error(e)
      }
    },

    // Login admin 
    signIn: async (req, res) => {
      try {

        let value = req.value

        let user = await User.findOne({
          email: value.email
        })

        // If user does not  exist Response with 
        if (!user) {
          return errors(res, 400, 'user not Found', 'no user found')

        } else {

          //validPassword used for verify password  by encrypting
          if (user.validPassword(value.password)) {

            user.loggedIn = new Date()

            user = await user.save()

            const {
              _id,
              email,
              loggedIn
            } = user.toObject()

            //Creating payload for jwt
            const tokenData = {
              _id,
              email,
              loggedIn
            }

            /* Generating jwt token
               Not using expiry time for jwt token bt we can make expiry
            */
            let token = jwt.sign(tokenData, process.env.secret_key)

            data = {
              token
            }

            return success(res, 200, data, 'user data')

          } else {
            return errors(res, 400, 'Invalid email/Password', 'Invalid email/Password')
          }
        }

      } catch (e) {
        console.log(e)
        return errors(res, 500, e)
      }
    },
    userList: async (req, res) => {

      try {
        let userName = req.query.userName,
          organizationName = req.query.organizationName,
          skip = parseInt(req.query.skip) || 0,
          limit = parseInt(req.query.limit) || 10
        userList = await User.aggregate([
          {
            $lookup: {
              from: 'organizations',
              localField: 'organization',
              foreignField: '_id',
              as: 'organization'
            }
          },
          {
            $unwind: {
              path: '$organization',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $match: {
              "name": { $regex: ".*" + userName + ".*" },
              "organization.name": { $regex: ".*" + organizationName + ".*", $options: 'i' },
              "status": 1
            },
          },
          {
            $project: {
              "name": 1, "email": 1, "organization.name": "$organization.name",
              "organization.location": "$organization.location",
              "status": 1,
              "organization.size": "$organization.size",
              "organization.established": "$organization.established",
              "organization.type": "$organization.type"
            }
          },
          { $skip: skip }, { $limit: limit }
        ])
        return success(res, 200, userList, 'user list data')
      } catch (e) {
        console.log(e)
        return errors(res, 500, e)
      }
    },

    editUser: async (req, res) => {
      try {

        let _id = req.body.id
        data = req.body

        let updateUserStatus = await User.update({
          _id: _id,
        }, data)
        if (updateUserStatus.nModified === 1) {
          return success(res, 200, 'user data updated successfully')
        } else {
          return errors(res, 400, "User not updated")
        }

      } catch (e) {
        console.log(e)
        return errors(res, 500, e)
      }
    },
    deleteUser: async (req, res) => {
      try {
        let _id = req.query.id
        data = req.body
        let deleteUserStatus = await User.update({
          _id: _id,
        }, {
            status: 2
          })
        if (deleteUserStatus.nModified === 1) {
          return success(res, 200, data, 'User deleted')
        } else {
          return errors(res, 400, "User deleted already")
        }

      } catch (e) {
        console.log(e)
        return errors(res, 500, e)
      }
    },
  }
  return Object.freeze(methods)
}

module.exports = userCtrl()