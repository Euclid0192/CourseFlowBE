import mongoose from "mongoose"

export interface user {
    username: string,
    password: string,
}

/// create a schema
const userSchema =  new mongoose.Schema<user>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})


/// Actual model
const User = mongoose.model("User", userSchema)

export default User