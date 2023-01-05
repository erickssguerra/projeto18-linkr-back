import { Router } from "express";
import { getHashtags } from "../controllers/hash.controllers.js";

const hashsRouter = Router();

hashsRouter.get("/hashtags", getHashtags);

export default hashsRouter;
