import { Request, Response } from "express"
import Flow from "../models/Flow"

// @desc Get all flows
// @route GET /flows
// @access Private
const getAllFlows = async (req: Request, res: Response) => {
    console.log('In get all flows...') 
    
    const result = await Flow.find()

    res.send("GET /flows")
}

// @desc Save current flow
// @route POST /flows
// @access Private
const saveFlow = async (req: Request, res: Response) => {
    console.log('In save flow...')

    res.send("POST /flows")
}

export { getAllFlows, saveFlow }