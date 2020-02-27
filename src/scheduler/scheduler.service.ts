import { Injectable } from '@nestjs/common';

import { schedules } from './scheduler.data';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';

@Injectable()
export class SchedulerService {

  createScheduler(scheduler: CreateSchedulerDto) {
    schedules.push(scheduler);
  }

}
