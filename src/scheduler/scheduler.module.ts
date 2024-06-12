import { Module } from '@nestjs/common';

import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';
import { ProcessesController } from './process/processes.controller';
import { ProcessesService } from './process/processes.service';

@Module({
  controllers: [ ProcessesController, SchedulerController ], // essa ordem é importante para o correto funcionamento da api na estrutura atual
  providers: [SchedulerService, ProcessesService]
})
export class SchedulerModule {}
