import jwt from "jsonwebtoken";
import config from '../src/config/config.js'

const JWT_PRIVATE_KEY = config.JWT_PRIVATE_KEY;

export const generateToken = user => {
    const token = jwt.sign({ user }, JWT_PRIVATE_KEY, { expiresIn: '24h' })
    return token
}

export const authToken = (req, res, next) => {
    let token
    const authHeaders = req.headers.Authorization ? req.headers.Authorization : req.headers.authorization
    const cookieToken = req.cookies['authToken']
    if (!authHeaders && !cookieToken) return res.status(401).send({ error: 'No token received' })
    if (authHeaders) {
        token = authHeaders.split(' '[1])
    } else {
        token = cookieToken
    }
    jwt.verify(token, JWT_PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: 'Not Authorized' })
        req.user = credentials.user
        next()
    })
}