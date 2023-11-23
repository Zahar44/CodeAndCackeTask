import { Injectable } from "@nestjs/common";
import { ProcessTextRequestDto, ProcessTextResponseDto } from "./types";
import { LangChainService } from "../lang-chain/lang-chain.service";

@Injectable()
export class TextProcessingService {
    constructor (
        private readonly langChain: LangChainService,
    ) {}
    
    public async processText({ text }: ProcessTextRequestDto): Promise<ProcessTextResponseDto> {
        const resp = await this.langChain.getActionFromText(text);

        if (resp.type === 'action') {
            const res = await resp.action();
            if (typeof res === 'string') return { text: res };
            
            return { text: 'Appropriate action was applied without text message' };
        }
        
        return {
            text: resp.text,
        };
    }
}