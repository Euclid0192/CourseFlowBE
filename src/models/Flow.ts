import mongoose from "mongoose"

export interface flow {
    user: string,
    title: string,
    content: mongoose.Types.Array<string>
}

/// Flow schema
const flowSchema = new mongoose.Schema<flow>({
    user: {
        type: String,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: [String],
        require: true 
    }
}, {
    collection: 'Flows'
})

/// Flow model
const Flow = mongoose.model('Flow', flowSchema)

export default Flow