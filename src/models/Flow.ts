import mongoose from "mongoose"

/// Custom node type
export type node = {
    nodeId: string,
    title: string,
}

/// custom node schema
const nodeSchema = new mongoose.Schema<node>({
    nodeId: String,
    title: String,
})

/// custom edge type
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


/// Flow interface
export interface flow {
    user: string,
    title: string,
    type: string,
    nodes:  mongoose.Types.Array<node>,
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
    type: {
        type: String,
        require: true,
    },
    nodes: {
        type: [nodeSchema],
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