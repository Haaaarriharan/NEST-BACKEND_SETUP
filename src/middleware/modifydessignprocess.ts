import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Intercept the response here
    return next.handle().pipe(
      map((data) => {
        console.log(
          "''''''''''''''''''''''''''''''''''''",
          data.locals.modifyResponse,
        )

        let validateDesign = data.locals.modifyResponse
        if (validateDesign?.designStatus === 'pre_draft') {
          // a.disabled = true
          for (let i = 0; i < 1; i++) {
            data[i].disabled = true
          }
        } else if (validateDesign?.designStatus === 'man_sketch') {
          for (let i = 0; i < 2; i++) {
            data[i].disabled = true
          }
        } else if (validateDesign?.designStatus === 'cad') {
          for (let i = 0; i < 3; i++) {
            data[i].disabled = true
          }
        } else {
          for (let i = 0; i < 3; i++) {
            data[i].disabled = true
          }
        }

        // Modify the response data as needed
        return { data, message: 'Response intercepted and transformed' }
      }),
    )
  }
}
