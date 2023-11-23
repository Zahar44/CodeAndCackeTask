import { ArgumentsHost, HttpException, HttpStatus, InternalServerErrorException, Injectable, Logger } from "@nestjs/common";
import { Request, Response } from 'express';

@Injectable()
export class ExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(ExceptionFilter.name);

    catch(exception: any, context: ArgumentsHost) {
        const http = context.switchToHttp();
        const req = http.getRequest<Request>();
        const resp = http.getResponse<Response>();

        let errors: string[];
        let status: HttpStatus;
        if (exception instanceof HttpException) {
            [errors, status] = this.getHttpExceptionErrors(exception);
        } else {
            [errors, status] = this.getDefaultExceptionErrors();
        }

        this.logger.error(`Error on ${req.url}; got ${exception}; sent ${errors.join(',')}`);

        resp
            .status(status)
            .json({
                errors,
                timestamp: new Date().toISOString(),
                path: req.url,
            });
    }

    private getHttpExceptionErrors(exception: HttpException) {
        const response = exception.getResponse();
        const message = (typeof response === 'object' && 'message' in response) ?
            response.message as string : exception.message;
        const errors = Array.isArray(message) ? message as string[] : [message];
        return [errors, exception.getStatus()] as const;
    }

    private getDefaultExceptionErrors() {
        const exception = new InternalServerErrorException();
        const errors = [exception.message];
        return [errors, exception.getStatus()] as const;
    }
}
