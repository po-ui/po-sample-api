import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';
import { ProcessesService } from './process/processes.service';
import { schedules } from './scheduler.data';

@Injectable()
export class SchedulerService {
  constructor(private processService: ProcessesService) {}

  createScheduler(scheduler: CreateSchedulerDto) {
    const newScheduler = { ...scheduler, id: new Date().getTime().toString() };
    schedules.push(newScheduler);
    return newScheduler;
  }

  getAll() {
    return schedules;
  }

  getById(id: string) {
    const found = schedules.find((item) => item.id === id);
    if (!found) {
      throw new NotFoundException(`Scheduler with id ${id} not found`);
    }

    const process = this.processService.getProcess(found.processID);

    return {
      ...found,
      process,
    };
  }

  updateScheduler(id: string, updatedScheduler: CreateSchedulerDto) {
    const index = schedules.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Scheduler with id ${id} not found`);
    }

    schedules[index] = { ...schedules[index], ...updatedScheduler };
    return schedules[index];
  }
}
