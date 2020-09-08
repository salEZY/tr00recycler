require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8085;

const connectDb = require("./helpers/db");

connectDb();

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

app.use("/api/materials/", require("./routes/materials"));
app.use("/api/auth/", require("./routes/users"));

app.listen(port, () => {
  console.log(`TrueRecycler server started at port ${port}`);
});
