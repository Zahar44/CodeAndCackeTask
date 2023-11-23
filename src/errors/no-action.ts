import { HttpException } from "@nestjs/common";

export const NoActionException = new HttpException('No action found for request', 500);