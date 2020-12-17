import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';

@Module({
  imports: [],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule { }
