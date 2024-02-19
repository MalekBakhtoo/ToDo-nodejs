const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb://db/todo')
      .then(() => console.log("connect to mongoose"))
      .catch((error) => console.log(error));
};

module.exports = connectDB;
