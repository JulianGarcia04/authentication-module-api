import {
  Injectable,
  type NestInterceptor,
  type ExecutionContext,
  type CallHandler,
  Logger,
} from "@nestjs/common";
import type { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class BodyLoggerInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const body = req.body;

    Logger.log("Request body:", JSON.stringify(body, null, 2));

    return next.handle().pipe(tap(() => console.log(`Request to ${req.path} processed`)));
  }
}
