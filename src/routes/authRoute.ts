import { Router } from "express"
import { login, signup, logout, refresh } from "../controllers/authController"

const router = Router()

router.route('/login')
    .post(login)

router.route('/signup')
    .post(signup)

router.route('/logout')
    .post(logout)

/// Get refresh token
router.route('/refresh')
    .get(refresh)

export default router