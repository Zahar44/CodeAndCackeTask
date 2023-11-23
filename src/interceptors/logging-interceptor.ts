import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Request } from "express";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const url = context.switchToHttp().getRequest<Request>().url;
        this.logger.log(`Before ${url}`);

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => this.logger.log(`After ${url} ${Date.now() - now}ms`)),
            );
    }
}
