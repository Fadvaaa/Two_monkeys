const express = require('express')
const router = express.Router()
const Crud = require('../utils/Crud')
const SendJson = require('../utils/SendJson')
const { createUser, updateUser, loginUser, deleteUser, chooseProfile, listUsers,listFavourites } = require('../Controller/userController')
const { Authentication } = require('../utils/sendToken')

router.get('/list',Authentication,async (req, res) => {
    const result = await listUsers(req)
    SendJson(res, result)
})

router.post('/createuser', async (req, res) => {
    const result = await createUser(req)
    SendJson(res, result)
})

router.post('/login', async (req, res) => {
    const result = await loginUser(req)
    SendJson(res, result)
})

router.put('/updateuser', Authentication, async (req, res) => {
    const result = await updateUser(req)
    SendJson(res, result)
})

router.delete('/deleteuser', Authentication, async (req, res) => {
    const result = await deleteUser(req)
    SendJson(res, result)
})



module.exports = router
