import { Request, Response } from "express"
import User from "../models/User"
import { RequestBody } from "../interfaces/RequestBody"

/// @desc get user information
/// @route GET /user
/// @access private
const getUserInfo =async (req: RequestBody<{username: string}>, res: Response) => {
    
    const { username} = req.body

    /// Check blank username
    if (!username)
        return res.status(400).json({ message: "Username cannot be blank!"})

    /// Check existence
    const user = await User.find({ username }).lean()
    
    if (!user.length)
        return res.status(400).json({ message: "User not found!"})

    // console.log("User returned from mongoose query ", user)

    return res.status(201).json({ message: `User ${user[0].username} with password ${user[0].password} `})
}

/// @desc create new user
/// @route POST /user
/// @access public
const createNewUser = async (req: RequestBody<{username: string, password: string}>, res: Response) => {
    
    const { username, password } = req.body

    /// Check blank username
    if (!username)
        return res.status(400).json({ message: "Username cannot be blank!"})

    /// Check blank password
    if (!password)
        return res.status(400).json({ message: "Password cannot be blank!"})

    /// Check existence
    const user = await User.find({ username }).lean()
    
    if (user.length)
    {
        return res.status(400).json({ message: "This username currently exists"})
    }

    // console.log("User returned from mongoose query ", user)

    const newUser = await User.create({ username, password })

    if (!newUser)
        return res.status(400).json({ message: "Failed to create new user."})

    return res.status(201).json({ message: `User ${newUser.username} with password ${newUser.password} created!`})
}

/// @desc edit user info
/// @route PATCH /user
/// @access private
const updateUser =async (req: RequestBody<{username: string, password: string }>, res: Response) => {
    
    const { username, password } = req.body

    /// Check blank username
    if (!username || !password)
        return res.status(400).json({ message: "All fields are required!"})

    /// Check existence
    const user = await User.findOne({ username })
    
    if (!user)
        return res.status(400).json({ message: "User not found!"})

    user.username = username
    user.password = password

    const updateUser = await user.save()

    return res.status(201).json({ message: `User ${user.username} with password ${user.password} `})
}

/// @desc delete an user
/// @route DELETE /user
/// @access private
const deleteUser =async (req: RequestBody<{username: string}>, res: Response) => {
    
    const { username } = req.body

    /// Check blank username
    if (!username)
        return res.status(400).json({ message: "Username cannot be blank!"})

    /// Check existence
    const user = await User.findOne({ username })
    
    if (!user)
        return res.status(400).json({ message: "User not found!"})

    // console.log("User returned from mongoose query ", user)

    await User.findOneAndDelete({ username }) 

    return res.status(201).json({ message: `User ${user.username} deleted!`})
}



export {
    getUserInfo,
    createNewUser,
    updateUser,
    deleteUser
}