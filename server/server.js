require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DB."));

app.use(express.json());
app.use(cors());

const postsRouter = require("./routes/posts");
app.use("/", postsRouter);

app.listen(5000, () => console.log("Server started..."));
