const express = require('express')
const router = express.Router()
const flowsController = require('../controllers/flowsController')

router.route('/')
    .get(flowsController.getAllFlows)
    .post(flowsController.saveFlow)

module.exports = router