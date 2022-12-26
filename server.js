require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8085;

const connectDb = require("./helpers/db");

connectDb();

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

app.use("/api/materials/", require("./routes/materials"));
app.use("/api/auth/", require("./routes/users"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("true-recycler-front/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "true-recycler-front", "build", "index.html")
    );
  });
}

app.listen(port, () => {
  console.log(`TrueRecycler server started at port ${port}!`);
});
