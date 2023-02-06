import { Controller, Post, Body, Put, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

import { SchedulerService } from './scheduler.service';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';

@ApiTags('scheduler')
@Controller('scheduler')
export class SchedulerController {

  constructor(private schedulerService: SchedulerService) {}

  @ApiResponse({ status: 201, type: CreateSchedulerDto })
  @ApiBody({ type: CreateSchedulerDto })
  @Post()
  createScheduler(@Body() newScheduler: CreateSchedulerDto) {
    this.schedulerService.createScheduler(newScheduler);
  }

  @ApiResponse({ status: 200, type: CreateSchedulerDto })
  @Get()
  get(@Param() params) {
    return this.schedulerService.getScheduler(params['id']);
  }

  @ApiResponse({ status: 200, type: CreateSchedulerDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getPerson(@Param() params) {
    return this.schedulerService.getScheduler(params['id']);
  }

  @ApiResponse({ status: 201, type: CreateSchedulerDto })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateSchedulerDto })
  @Put(':id')
  updateScheduler(@Body() scheduler: CreateSchedulerDto, @Param() param) {
    this.schedulerService.updateScheduler(param['id'], scheduler);
  }

}
