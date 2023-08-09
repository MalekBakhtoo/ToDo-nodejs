const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb://127.0.0.1/ToDo')
      .then(() => console.log("connect to mongoose"))
      .catch((error) => console.log(error));
};

module.exports = connectDB;
