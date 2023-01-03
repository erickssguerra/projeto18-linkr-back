import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router.js";
dotenv.config();

const server = express();

server.use(cors());
server.use(json());
server.use(router);

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
