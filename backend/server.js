import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// internal files import
import data from "./data/data.js";
import connectDB from "./config/db.js";
import authHandler from "./routes/auth.js";
import userHandler from "./routes/user.js";
import chatHandler from "./routes/chat.js";
import messageHandler from "./routes/message.js";

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

const corsOptions = {
  origin: true,
};

app.use(express.json()); // this middleware sets the "our server accepts json data" => new you can send data raw in json format
app.use(cors(corsOptions)); // this middleware configures the frontend requests to backend
app.use(bodyParser.urlencoded({ extended: true })); // using bodyparser u need to send data x-encoded format

app.use("/api/v1/auth", authHandler);
app.use("/api/v1/users", userHandler);
app.use("/api/v1/chat", chatHandler);
app.use("/api/v1/message", messageHandler);

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/api/v1/chats", (req, res) => {
  res.send(data);
});

app.get("/api/v1/chats/:id", (req, res) => {
  const id = req.params.id;
  const singleChat = data.find((c) => c._id == id);

  res.send(singleChat);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
