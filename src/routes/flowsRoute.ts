import { Router } from 'express'
import { deleteFlow, getAllFlows, saveFlow, updateFlow } from '../controllers/flowsController'

const router = Router()

router.route('/')
    .get(getAllFlows)
    .post(saveFlow)
    .patch(updateFlow)
    .delete(deleteFlow)

export default router