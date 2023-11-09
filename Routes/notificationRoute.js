const express = require("express");
const SendJson = require("../utils/SendJson");
const { listNotification } = require("../Controller/NotificationController");
const { Authentication } = require("../utils/sendToken");
const router = express.Router();

router.get("/",Authentication, async (req, res) => {
  const result = await listNotification(req);
  SendJson(res, result);
});

module.exports = router;
