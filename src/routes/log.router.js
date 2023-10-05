import { Router } from "express";

const logRouter = Router()

logRouter.get('/', (req, res) =>{
    req.logger.fatal ('log fatal')
    req.logger.error ('log error')
    req.logger.warning ('log warning')
    req.logger.info ('log info')
    req.logger.http ('log http')
    req.logger.debug ('log debug')
    res.send('ok')
})

export default logRouter;