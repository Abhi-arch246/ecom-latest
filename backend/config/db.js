const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) console.log("Mongodb connected successfully");
    else console.log("Not connected Db");
  } catch (error) {
    console.log(`Network error connecting to Db ${error}`);
    process.exit(1);
  }
};

module.exports = connectDb;
