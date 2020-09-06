const mongoose = require("mongoose");
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@materijali-q1tln.mongodb.net/test?retryWrites=true&w=majority`;

const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
