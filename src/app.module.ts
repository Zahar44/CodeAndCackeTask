import { Module } from '@nestjs/common';
import { TextProcessingModule } from './modules/text-processing/text-processing.module';

@Module({
  imports: [TextProcessingModule],
})
export class AppModule {}
