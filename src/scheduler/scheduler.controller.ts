import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { SchedulerService } from './scheduler.service';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';

@ApiTags('scheduler')
@Controller('scheduler')
export class SchedulerController {

  constructor(private schedulerService: SchedulerService) {}

  @ApiBody({ type: CreateSchedulerDto })
  @Post()
  createScheduler(@Body() newScheduler: CreateSchedulerDto) {
    this.schedulerService.createScheduler(newScheduler);
  }

}
