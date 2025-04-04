import express from "express"
import { createUser, getAllUsers, getCurrentUserController, logoutUser, updateCurrentUserProfile, userLogin } from "../controllers/userController.js"
import { authenticate, authorizeAdmin }  from "../middlewares/authMiddleware.js"

const router = express.Router()


router.route("/").post(createUser)
router.route("/login").post(userLogin)
router.route("/logout").post(logoutUser)
router.route("/").get(authenticate, authorizeAdmin, getAllUsers)
router.route("/profile").get(authenticate, getCurrentUserController).put(authenticate, updateCurrentUserProfile)

export default router