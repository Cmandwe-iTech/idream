const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { mongo, default: mongoose } = require("mongoose");
const post_route = require("./routes/postroute");
const app = express();
const port = process.env.Port;
app.use(express.json());
app.use(bodyparser.json());
mongoose.connect(process.env.Database_URL).then(() => {
  console.log("connected to Db");
});
app.use("/", post_route);
app.listen(port, () => {
  console.log(`server started at port http://localhost:${port}`);
});
