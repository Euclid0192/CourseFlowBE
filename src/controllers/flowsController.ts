import { Request, Response } from "express"
import mongoose from "mongoose"
import Flow from "../models/Flow"
import { RequestBody } from "../interfaces/RequestBody"

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
        console.log("Duplicate ", duplicate)
        return res.status(400).json({ message: 'Title exists! Create a new title for this flow!'})
    }

    /// No duplicate -> create note
    const createFlow = await Flow.create({ user, title, content })

    if (createFlow) { /// success
        return res.status(201).json({ message: "Save flow to account!"})
    } else { /// failed
        return res.status(400).json({ message: "Failed to save the flow!"})
    }
}

// @desc Update a flow
// @route PATCH /flows
// @access PRIVATE
const updateFlow =async (req: RequestBody<{id: string, user: string, title: string, content: mongoose.Types.Array<string>}>, res: Response) => {
    
    const { id, user, title, content } = req.body 

    /// Missing some fields
    if (!id || !user || !title || !content)
    {
        return res.status(400).json({ message: 'All fields are required!'})
    }

    /// check if content is not array
    if (!(content instanceof Array))
    {
        console.log("Content from HTTP req ", content)
        return res.status(400).json({ message: 'Invalid content!!!'})
    }

    /// Check for existence
    const flow = await Flow.findById(id)

    if (!flow)
    {
        return res.status(400).json({ message: 'Flow does not exist in database!'})
    }

    /// Exists
    flow!.user = user
    flow!.title = title
    flow!.content = content

    const updateFlow = await flow!.save()

    console.log("update flowwwwwwwwwww", updateFlow)
    
    return res.status(201).json({ message: "Update flow successfully!"})
}

// @desc Delete a flow
// @route DELETE /flows
// @acess PRIVATE
const deleteFlow =async (req: RequestBody<{id: string, title: string}>, res: Response) => {
    const { id } = req.body

    /// Check if null data
    if (!id)
    {
        return res.status(400).json({ message: "All fields are required!"});
    }

    /// Check for existence 
    const flow = await Flow.findById(id)

    if (!flow)
    {
        return res.status(400).json({ message: 'Flow does not exist in database!!!'})
    }

    const response = await Flow.findByIdAndDelete(id)

    res.json(response)
}

export { getAllFlows, saveFlow, updateFlow, deleteFlow }