const Favourites = require('../Model/Favourites')
const HandleError = require('../utils/HandleError')
const Notification = require("../Model/Notification");


module.exports.chooseProfile = async (req, res) => {
    try {
        const { liked_users, my_id } = req.body

        if (!liked_users || !Array.isArray(liked_users) || liked_users.length === 0) {
            return { message: 'Invalid input', code: 400 };
        }

        // Exclude the user's own ID from the liked_users array
        const filteredLikedUsers = liked_users.filter(userId => userId !== my_id);

        const saveProfile = await Favourites({ my_id: req.user._id, liked_users: filteredLikedUsers }).save();

        if (saveProfile) {
            // Generate notification message and save it
            const notificationMessage = `${req.user.name} sent you a connection request.`;

            const notification = new Notification({
                user_id: liked_users,  // Assuming user_id field in Notification model
                message: notificationMessage,
                sender_id:req.body.liked_users
            });

            await notification.save();

            return { message: 'Success', code: 200 };
        }

        return { message: 'Error', code: 404 };
    } catch (error) {
        return HandleError(error);
    }
};


//list favourites of a particular user
module.exports.listFavourites = async (req, res) => {
    try {
        const favourite = await Favourites.findOne({ my_id: req.user._id }).populate('liked_users')
        if (favourite) {
            return { data: favourite }
        }
        return { message: 'Error', code: 404 }
    } catch (error) {
        return HandleError(error)
    }
}

module.exports.matchedProfiles = async (req, res) => {
    try {

    } catch (error) {
        return HandleError(error)
    }
}