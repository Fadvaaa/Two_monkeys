const express = require('express')
const router = express.Router()
const { Authentication } = require('../utils/sendToken')
const { listFavourites, chooseProfile } = require('../Controller/profileController')
const SendJson = require('../utils/SendJson')

router.get('/listfavourites', Authentication, async (req, res) => {
    const result = await listFavourites(req)
    SendJson(res, result)
})

router.post('/chooseprofile', Authentication, async (req, res) => {
    const result = await chooseProfile(req)
    SendJson(res, result)
})

module.exports = router
