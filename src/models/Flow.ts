import mongoose from "mongoose"

export type position = {
    x: number,
    y: number,
}

const positionSchema = new mongoose.Schema<position>({
    x: Number,
    y: Number
})

/// Custom node type
export type node = {
    nodeId: string,
    title: string,
    type: string,
    position: position
}

/// custom node schema
const nodeSchema = new mongoose.Schema<node>({
    nodeId: String,
    title: String,
    type: String, /// usersCreated or generated
    position: positionSchema
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