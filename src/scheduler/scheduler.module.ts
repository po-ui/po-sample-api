import { Module } from '@nestjs/common';

import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';
import { ProcessesController } from './process/processes.controller';
import { ProcessesService } from './process/processes.service';

@Module({
  controllers: [SchedulerController, ProcessesController],
  providers: [SchedulerService, ProcessesService]
})
export class SchedulerModule {}
