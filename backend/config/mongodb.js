const mongoose = require("mongoose");
const createAdmin = require("../data/admin");

const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    await createAdmin();

  }
  catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;