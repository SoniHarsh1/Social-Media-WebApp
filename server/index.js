import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routers
import AuthRoutes from "./Routes/AuthRoutes.js";
import UserRoutes from "./Routes/UserRoutes.js";
import PostRoutes from "./Routes/PostRoutes.js";
import UploadRoutes from "./Routes/UploadRoutes.js";
import ChatRoutes from "./Routes/ChatRoutes.js";
import MessageRoutes from "./Routes/MessageRoutes.js";
import { stat } from "fs";

const app = express();
dotenv.config();
// to serve images to public
app.use(express.static('public'));
app.use("/images", express.static("images"));

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_LINK,
    methods: ['GET', 'POST', 'UPDATE', 'PUT'],
    credentials: true,
  }),
)

app.get('/', (req, res) => {
  res.send('Hello from server')
})

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));


  // usage of routes
  app.use("/auth", AuthRoutes);
  app.use("/user", UserRoutes);
  app.use("/post", PostRoutes);
  app.use("/upload", UploadRoutes);
  app.use("/chat", ChatRoutes);
  app.use("/message", MessageRoutes);