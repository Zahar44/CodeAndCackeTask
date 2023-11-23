import { Module } from "@nestjs/common";
import { TextProcessingController } from "./text-processing.controller";
import { TextProcessingService } from "./text-processing.service";
import { LangChainModule } from "../lang-chain/lang-chain.module";

@Module({
    imports: [LangChainModule],
    controllers: [TextProcessingController],
    providers: [TextProcessingService],
})
export class TextProcessingModule {}