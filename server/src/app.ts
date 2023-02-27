import express, { NextFunction, Request, Response } from 'express'
import env from './env'
import { errorMiddleware } from './middleware/error.middleware'
import mainRouter from './routes/mainRouter'
import { Logger } from './utils/logger'
import cors from 'cors';
require('dotenv').config()

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
    credentials: true
};

const logger = new Logger('nft-back');
(async () => {
    const app = express()
    app.use(cors(options))
    app.use(express.json({ limit: '10kb' }))

    app.use((req: Request, res: Response, next: NextFunction) => {
        logger.log(
            'Received request: ' +
                req.originalUrl +
                ' ' +
                JSON.stringify(req.body),
        )

        const oldWrite = res.write
        const oldEnd = res.end

        const chunks: any[] = []

        res.write = (...restArgs: any): any => {
            chunks.push(Buffer.from(restArgs[0]))
            oldWrite.apply(res, restArgs)
        }

        res.end = (...restArgs: any): any => {
            if (restArgs[0]) {
                chunks.push(Buffer.from(restArgs[0]))
            }
            const body = Buffer.concat(chunks).toString('utf8')
            logger.log('Returning response: ' + JSON.stringify(body))
            oldEnd.apply(res, restArgs)
        }

        next()
    })

    app.use(mainRouter)

    app.use(errorMiddleware)

    const port = env.PORT || 8080
    app.listen(port)

    logger.log(`Server started on port: ${port}`)
})().catch((err) => {
    logger.error('CRITICAL!!! Server not started')
    logger.error(err)
    process.exit(1)
})

process.on('uncaughtException', (err) => {
    logger.error('CRITICAL!!! Uncaught exception.')
    logger.error(err)
})

process.on('unhandledRejection', (err) => {
    logger.error('CRITICAL!!! Unhandled rejection.')
    logger.error(err)
})
