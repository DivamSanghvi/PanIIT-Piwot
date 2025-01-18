import { Router } from "express";
import { analyzePlantDisease, askGemini, getCropLifeCycle, signup } from "../controllers/FarmerControllers/farmer.controller.js";
import { login } from "../controllers/FarmerControllers/farmer.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router()

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/askGemini").post(askGemini)
router.route("/plantDisease").post(upload.fields([
    {
        name: "photo",
        maxCount:1
    }
]),analyzePlantDisease)
router.route("/croplifecycle/:farmerId").post(getCropLifeCycle);
export default router