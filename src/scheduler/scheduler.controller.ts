import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

import { CreateSchedulerDto } from './dto/create-scheduler.dto';
import { SchedulerService } from './scheduler.service';

@ApiTags('scheduler')
@Controller('scheduler')
export class SchedulerController {
  constructor(private schedulerService: SchedulerService) {}

  @ApiBody({ type: CreateSchedulerDto })
  @Post()
  createScheduler(@Body() newScheduler: CreateSchedulerDto) {
    return this.schedulerService.createScheduler(newScheduler);
  }

  @Get()
  getAllSchedulers() {
    return this.schedulerService.getAll();
  }

  @Get('/:id')
  getSchedulerById(@Param('id') id: string) {
    console.log('[SchedulerController] id:', id);
    return this.schedulerService.getById(id);
  }

  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: CreateSchedulerDto })
  @Put('/:id')
  updateScheduler(@Param('id') id: string, @Body() schedulerData: CreateSchedulerDto) {
    return this.schedulerService.updateScheduler(id, schedulerData);
  }
}