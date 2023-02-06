import { Injectable } from '@nestjs/common';
import { Scheduler } from './scheduler.interface';
import { schedulers } from './db/scheduler.data';

import { CreateSchedulerDto } from './dto/create-scheduler.dto';

@Injectable()
export class SchedulerService {

  createScheduler(scheduler: CreateSchedulerDto) {
    schedulers.push(scheduler);
  }

  updateScheduler(id: string, updatedScheduler: CreateSchedulerDto) {
    const scheduler = this.getScheduler(id);
    Object.assign(scheduler, updatedScheduler);
  }

  getScheduler(id: string): Scheduler {
    return schedulers.find(item => item.id === id);
  }

}
