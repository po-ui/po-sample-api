import { Module } from '@nestjs/common';
import { SampleSelectController } from './sample-select.controller';
import { SampleSelectService } from './sample-select.service';

@Module({
  imports: [],
  controllers: [SampleSelectController],
  providers: [SampleSelectService],
})
export class SampleSelectModule {}
