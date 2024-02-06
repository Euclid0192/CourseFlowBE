import { Router } from "express"
import { getUserInfo, createNewUser, updateUser, deleteUser } from '../controllers/usersController'

const router = Router()

router.route('/')
    .get(getUserInfo)
    .post(createNewUser)
    .patch(updateUser)
    .delete(deleteUser)

export default router