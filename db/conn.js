const mongoose = require("mongoose");

// conneting to database

const DB = "mongodb://chanshu:vid49NXZyd5M2f6u@cluster0-shard-00-00.vsvtl.mongodb.net:27017,cluster0-shard-00-01.vsvtl.mongodb.net:27017,cluster0-shard-00-02.vsvtl.mongodb.net:27017/urlshortner?ssl=true&replicaSet=atlas-10wjd0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
.then(() => {
  console.log("connection successful");
})
.catch((err) => console.log(err));
