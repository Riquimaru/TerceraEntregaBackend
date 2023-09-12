import dotenv from 'dotenv'

dotenv.config()

export default{
    port: process.env.PORT,
    mongoUrl: process.env.MONGO,
    persistence: process.env.PERSISTENCE,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
}