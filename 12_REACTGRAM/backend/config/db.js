const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
  // try {
  //   const dbConn = await mongoose.connect(
  //     `mongodb+srv://${dbUser}:${dbPassword}@cluster0.yw7jq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  //   );

  try {
    const dbConn = await mongoose.connect(
      "mongodb://admin:password@localhost:27017",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: "admin",
      }
    );

    console.log("Conectou ao Banco");
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();

module.exports = conn;
