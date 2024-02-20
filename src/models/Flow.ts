import mongoose, { Schema } from "mongoose"

export type edge = {
    source: string,
    destination: string,
}

/// custom edge schema
const edgeSchema = new mongoose.Schema<edge>({
    source: {
        type: String,
        require: true
    },
    destination: {
        type: String,
        require: true
    }
})

export interface flow {
    user: string,
    title: string,
    nodes: mongoose.Types.Array<string>
    edges: mongoose.Types.Array<edge>
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
    nodes: {
        type: [String],
        require: true 
    },
    edges: {
        type: [edgeSchema],
        require: true
    }
}, {
    collection: 'Flows'
})

/// Flow model
const Flow = mongoose.model('Flow', flowSchema)

export default Flow