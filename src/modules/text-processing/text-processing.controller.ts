import { Body, Controller, Post } from "@nestjs/common";
import { ProcessTextRequestDto, ProcessTextResponseDto } from "./types";
import { TextProcessingService } from "./text-processing.service";

@Controller()
export class TextProcessingController {
    constructor(
        private readonly textProcessingService: TextProcessingService,
    ) {}

    @Post('process-text')
    public async processText(@Body() body: ProcessTextRequestDto): Promise<ProcessTextResponseDto> {
        return this.textProcessingService.processText(body);
    }
}