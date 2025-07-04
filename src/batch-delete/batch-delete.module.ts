import { Module } from '@nestjs/common';

import { BatchDeleteController } from './batch-delete.controller';
import { BatchDeleteService } from './batch-delete.service';

@Module({
  imports: [],
  controllers: [BatchDeleteController],
  providers: [BatchDeleteService],
})
export class BatchDeleteModule {}