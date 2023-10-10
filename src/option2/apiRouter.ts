import { Router } from "express"
import * as apiController from "./apiController"

const router = Router();

router.get('/', apiController.getAll)

export default router;