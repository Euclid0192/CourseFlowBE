import mongoose from "mongoose"

export interface flow {
    user: mongoose.Types.ObjectId,
    content: mongoose.Types.Array<string>
}

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
const Flow = mongoose.model('Flow', flowSchema)

export default Flow