import express from "express"
import { createUser, getAllUsers, logoutUser, userLogin } from "../controllers/userController.js"
import { authenticate, authorizeAdmin }  from "../middlewares/authMiddleware.js"

const router = express.Router()


router.route("/signup").post(createUser)
router.route("/login").post(userLogin)
router.route("/logout").post(logoutUser)
router.route("/").get(authenticate, authorizeAdmin, getAllUsers)

export default router