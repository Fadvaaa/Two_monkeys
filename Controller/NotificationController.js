const { default: mongoose } = require("mongoose");
const Notification = require("../Model/Notification");
const HandleError = require("../utils/HandleError");

module.exports.listNotification = async (req, res) => {
  try {
      const { page, limit } = req.query;
      const condition = {};

      const user_id = req.user._id;

      if (user_id) {
          condition.user_id = new mongoose.Types.ObjectId(user_id);
      } else {
          return { message: 'User Not Found', code: 404 };
      }

      const notifications = await Notification.find(condition)
          .sort({ createdAt: "desc" })
          .skip((page - 1) * limit)
          .limit(limit)
          .select(req.query.select);

      return { data: notifications };
  } catch (error) {
      return HandleError(error);
  }
};
