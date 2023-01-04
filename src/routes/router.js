import { Router } from "express";

import postsRoute from './posts.route.js'; 

const router = Router()

router.use(postsRoute);

export default router;