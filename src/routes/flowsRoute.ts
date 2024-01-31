import { Router } from 'express'
import { getAllFlows, saveFlow, updateFlow } from '../controllers/flowsController'

const router = Router()

router.route('/')
    .get(getAllFlows)
    .post(saveFlow)
    .patch(updateFlow)

export default router