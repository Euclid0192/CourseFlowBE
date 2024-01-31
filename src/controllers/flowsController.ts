import { Request, Response } from "express"
import Flow from "../models/Flow"

// @desc Get all flows
// @route GET /flows
// @access Private
const getAllFlows = async (req: Request, res: Response) => {
    console.log('In get all flows...') 
    
    const flows = await Flow.find()

    console.log("flowsssssssssssss ", flows)

    // res.send("GET /flows")
    res.send(flows)

    return flows
}

// @desc Save current flow
// @route POST /flows
// @access Private
const saveFlow = async (req: Request, res: Response) => {
    console.log('In save flow...')

    const { user, title, content } = req.body

    /// Confirm if enough data provided
    if (!user || !title || !content)
    {   
        return res.status(400).json({ message: 'All fields are required!!!'})
    }

    /// Check for duplicate
    const duplicate = await Flow.findOne({ title })

    if (duplicate)
    {
        return res.status(400).json({ message: 'Title exists! Create a new title for this flow!'})
    }

    /// No duplicate -> create note
    const createFlow = await Flow.create({ user, title, content })

    if (createFlow) { /// success
        return res.status(201).json({ message: "Save flow to account!"})
    } else { /// failed
        return res.status(400).json({ message: "Failed to save the flow!"})
    }

    res.send("POST /flows")
}

export { getAllFlows, saveFlow }