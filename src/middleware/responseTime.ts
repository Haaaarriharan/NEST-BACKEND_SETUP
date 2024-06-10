import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

import { NextFunction, Request, Response } from 'express'

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP or REST_API')

  use(request: Request, response: Response, next: NextFunction): void {
    response.setHeader('x-powered-by', `Goldi's`)
    const startTime = Date.now()

    response.on('close', () => {
      const elapsedTime = Date.now() - startTime
      let finalString = `\x1b[33m${new Date().toLocaleString()}\x1b[0m \x1b[31m${
        request.method
      }\x1b[0m \x1b[36m${request.originalUrl}\x1b[0m \x1b[38;5;11m (${
        response.statusCode
      })\x1b[0m  -${process.env.SETENV} ${elapsedTime}ms`

      this.logger.log(finalString)
    })

    next()
  }
}
