import mongoose from "mongoose"

/// Flow schema
const flowSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: [String],
        require: true 
    }
})

/// Flow model
const Flow = new mongoose.Model('Flow', flowSchema)

export default Flow