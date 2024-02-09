import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {

    console.log("in verify JWT...........")
    
    const headers = req.headers.authorization

    if (!headers?.startsWith("Bearer "))
        return res.status(400).json({ message: "Unauthorized"})

    /// Auth header exists, verify JWT
    const token = headers.split(' ')[1]

    console.log("Token in verify middleware ", token)

    try {
        const decoded = jwt.verify(
            token,
            process.env.SECRET_ACCESS_TOKEN!
        )

        console.log("Decoded from jwt ", decoded)   
        next()

    } catch (err) {
        console.log("Error ", err)

        return res.status(400).json({ message: "Unauthorized"})
    }
}

export default verifyJWT