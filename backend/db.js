const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.db)
      .then(() => console.log("connect to mongoose"))
      .catch((error) => console.log(error));
};

module.exports = connectDB;
