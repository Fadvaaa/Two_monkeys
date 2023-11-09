const mongoose = require("mongoose");
const User = require("../Model/User");

module.exports.connect = async () => {
    try {
        const uri = process.env.DB_URL;
        mongoose.set("strictQuery", false);
        const db = await mongoose.connect(
            uri,
            { dbName: process.env.DB_NAME },
            { useNewUrlParser: true, useUnifiedTopology: true }
        );

        console.log(`Connected to the database ${process.env.DB_NAME}`);
        // const AdminExists = await User.findOne({ role: "superAdmin" });
        // if (!AdminExists) {
        //     await User({
        //         name: 'Admin',
        //         username: 'superAdmin@gmail.com',
        //         role: 'superAdmin'
        //     }).save()
        //     console.log('Admin created')
        // }

    } catch (error) {
        console.error("Error connecting to the database:", error);
        return false;
    }
};
