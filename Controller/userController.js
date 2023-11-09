const User = require('../Model/User')
const HandleError = require('../utils/HandleError')
const jwt = require('jsonwebtoken')
const fetchData = require('../utils/FetchData')

module.exports.createUser = async (req) => {
    try {
        const user = await User(req.body).save()
        if (user) {
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '24h' })

            return { data: token, message: 'Successfully Created', code: 200 }
        }
        return { message: 'Try again', code: 404 }
    } catch (error) {
        if (error.code === 11000) {
            return { message: 'User Already Exist With the Given Email Id', code: 409 }
        }
        console.log(error)
        return HandleError(error)
    }
}

module.exports.updateUser = async (req) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body)
        if (user) {
            return { message: 'Successfully Updated', code: 200 }
        }
    } catch (error) {
        return HandleError(error)
    }
}

module.exports.loginUser = async (req) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
                expiresIn: '24h',
            });
            return { data: token, message: 'Successfully Logged in' }
        }
        return { message: 'Invalid User Credentials', code: 401 }

    } catch (error) {
        return HandleError(error)
    }
}

module.exports.deleteUser = async (req) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id)
        if (user) {
            return { message: 'Successfully Deleted', code: 200 }
        }
    } catch (error) {
        return HandleError(error)
    }
}

module.exports.listUsers = async (req, res) => {
    try {
        const condition = {}
        
        if (req.query.age) {
            condition.age = req.query.age
        }
        if (req.query.hobby) {
            condition.hobby = req.query.hobby
        }
        if (req.query.location) {
            condition.location = req.query.location
        }

        // Exclude the user who provided the token
        condition._id = { $ne: req.user._id };

        data = await fetchData(req, res, User, {
            condition
        });
        return { data }
    } catch (error) {
        return HandleError(error)
    }
}



