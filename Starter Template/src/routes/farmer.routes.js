import { Router } from "express";
import { analyzeCattleDisease, analyzePlantDisease, askGemini, getCropLifeCycle, getWeatherByPincode, productLinks, signup, getLocation, getGraph, getFieldsByFarmer } from "../controllers/FarmerControllers/farmer.controller.js";
import { analyzeCattleDisease, analyzePlantDisease, askGemini, extractPincodeFromAadhar, farmerSignup, farmerSignup2, getCropLifeCycle, productLinks, signup } from "../controllers/FarmerControllers/farmer.controller.js";
import { login } from "../controllers/FarmerControllers/farmer.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router()

router.route("/signup").post(upload.fields([
    {
        name: "photo",
        maxCount:1
    }
]),farmerSignup)
router.route("/login").post(login)
router.route("/askGemini").post(askGemini)
router.route("/plantDisease").post(upload.fields([
    {
        name: "photo",
        maxCount:1
    }
]),analyzePlantDisease)
router.route("/croplifecycle/:farmerId").post(getCropLifeCycle);
//router.route("/get-weather/:pincode").get(getWeatherByPincode);
router.route("/cattleDisease").post(upload.fields([
    {
        name: "photo",
        maxCount:1
    }
]),analyzeCattleDisease)
router.route("/product").post(productLinks)
router.route("/getLocation").post(getLocation)
router.route("/getGraph").post(getGraph)
router.route("/aadharpincode").post(upload.fields([
    {
        maxCount:1
    }
]),extractPincodeFromAadhar)

export default router