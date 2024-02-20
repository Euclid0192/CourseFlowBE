import { Router } from 'express'
import { deleteFlow, getAllFlows, saveFlow, updateFlow } from '../controllers/flowsController'
import verifyJWT from '../middlewares/verifyJWT'

const router = Router()

// router.use(verifyJWT)

router.route('/')
    .get(getAllFlows)
    .post(saveFlow)
    .patch(updateFlow)
    .delete(deleteFlow)

export default router