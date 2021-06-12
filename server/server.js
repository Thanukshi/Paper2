const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./router");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/", routes);

const URI = process.env.MONGO_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to the mongo db");
  }
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
