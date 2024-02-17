import { Request, Response } from "express"
import User from "../models/User"
import { RequestBody } from "../interfaces/RequestBody"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { StringExpressionOperator } from "mongoose"

/// @desc login 
/// @route POST /auth/login
/// @access PRIVATE
const login = async (req: RequestBody<{ username: string, password: string}>, res: Response) => {

    const { username, password } = req.body

    if (!username || !password)
        return res.status(400).json({ message: "All fields are required!"})

    const user = await User.findOne({ username })

    if (!user)
        return res.status(401).json({ message: 'This user does not exist!'})

    const passwordMatch = await bcrypt.compare(password, user.password)

    // console.log(passwordMatch)

    if (!passwordMatch)
        return res.status(400).json({ message: 'Incorrect password'})

    /// Correct password -> create jwt token 
    /// jwt token: three parts: headers, payload (content, date), secret signature
    /// .sign(payload, secret, extra otpions)
    const token = jwt.sign(
        { 
            "User info": 
            { 
                username, 
            } 
        },
        process.env.SECRET_ACCESS_TOKEN!,
        {
            expiresIn: '1m'
        }
    )

    /// Create a long-lived refresh token
    const refreshToken = jwt.sign(
        { username },
        process.env.SECRET_REFRESH_TOKEN!,
        {
            expiresIn: '7d'
        }
    )

    /// Set token in cookies
    /// res.cookie(name, value): set a key-value pair in cookies
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(201).json({ 
        message: "Login successfully!",
        token,
        refreshToken
    })
    
}

/// @desc create new user
/// @route POST /auth/signup
/// @access PUBLIC
const signup = async (req: RequestBody<{ username: string, password: string}>, res: Response) => {
    
    const { username, password } = req.body

    /// Check blank username
    if (!username)
        return res.status(400).json({ message: "Username cannot be blank!"})

    /// Check blank password
    if (!password)
        return res.status(400).json({ message: "Password cannot be blank!"})

    /// Check existence
    const user = await User.findOne({ username }).lean()
    
    if (user)
    {
        return res.status(400).json({ message: "This user currently exists. Please try to log in."})
    }

    // console.log("User returned from mongoose query ", user)
    

    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT!))
    const newUser = await User.create({ username, password: hashPassword })

    if (!newUser)
        return res.status(400).json({ message: "Failed to create new user."})

    return res.status(201).json({ message: `User ${newUser.username} with password after hashing ${newUser.password} created!`})
}

/// @desc log out
/// @route POST /auth/logout
/// @access PRIVATE
const logout = async (req: Request, res: Response) => {
    const cookies = req.cookies

    if (!cookies?.refreshToken)
        return res.status(400).json({ message: 'No cookies'})

    res.clearCookie('refreshToken', { httpOnly: true })
    res.status(201).json({ message: "Logout successfully!"})
}

/// @desc send request with refresh token for a new access token 
/// @route GET /auth/refresh
/// @access PRIVATE
const refresh = async (req: Request, res: Response) => {
    const cookies = req.cookies

    /// No cookies -> has not logged in yet
    if (!cookies?.refreshToken)
        return res.status(400).json({ message: "Unauthorized"})

    interface jwtPayload {
        username: string,
    }

    const data = jwt.verify(
        cookies.refreshToken,
        process.env.SECRET_REFRESH_TOKEN!,
    ) as jwtPayload

    const foundUser = await User.findOne({ username: data.username })

    /// cannot find this user
    if (!foundUser)
        return res.status(400).json({ message: "Unauthorized"})

    /// Authorized -> give back another acess token and refresh token
    const newAccessToken = jwt.sign(
        {
            "User info": {
                username: foundUser.username,
            }
        },
        process.env.SECRET_ACCESS_TOKEN!,
        {
            expiresIn: '1d'
        }
    )

    const newRefreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.SECRET_REFRESH_TOKEN!,
        {
            expiresIn: '7d'
        }
    )

    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(201).json({ 
        message: "Login successfully!",
        token: newAccessToken,
        newRefreshToken
    })
}

export {
    login,
    signup,
    logout,
    refresh
}