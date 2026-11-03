const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);

        console.log("mongodb is connected successfully");
    } catch(e) {
        console.log("mongodb connected error ", e.message);
        process.exit(1)
    }
};

module.exports = connectDB