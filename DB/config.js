const mongoose = require("mongoose");

const dbConnection = async () => {

  try {

    await mongoose.connect(process.env.DB_CONNECTION);
    console.log('Db online')

  } catch (error) {
    
    console.log(error)
    throw new Error('error initialize DB')
  }
};

module.exports = { dbConnection }