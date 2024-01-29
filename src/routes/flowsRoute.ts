import { Router } from 'express'
import { getAllFlows, saveFlow } from '../controllers/flowsController'

const router = Router()

router.route('/')
    .get(getAllFlows)
    .post(saveFlow)

export default router