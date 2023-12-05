const express = require("express");
const mongoose = require("mongoose");
// req for paytm ****
const https = require("https");
const qs = require("querystring");

const checksum_lib = require("./Paytm/checksum");
const config = require("./Paytm/config");

const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

// const PORT = process.env.PORT || 4000;
// const PORT = 8080;
// ****
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080; //1

app.use(cors());
app.use(express.json());

//2
const uri =
  "mongodb+srv://vk_insane3:dsc_event@cluster0.d2jo8.mongodb.net/dsc_event_management?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//3
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("../frontend/build"));
// }

const conn = mongoose.connection;

conn.once("open", () => {
  console.debug("MongoDB Connection established");
});

// const eventRouter = require("./routes/event");

const bookRouter = require("./routes/book");
const userRouter = require("./routes/user");
// app.use("/event", eventRouter);

app.use("/book", bookRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.debug(`Server is running on port: ${port}`);
});
