import { Router } from "express"
import * as apiController from "./controllers"

const router = Router();

router.get('/api/posts', apiController.getAll)

export default router;