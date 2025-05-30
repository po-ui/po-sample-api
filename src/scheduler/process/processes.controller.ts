import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateParameterDto } from './dto/create-parameter.dto';
import { CreateProcessDto } from './dto/create-process.dto';
import { GetProcessesDto } from './dto/get-processes.dto';
import { ProcessesService } from './processes.service';

@ApiTags('processes')
@Controller('scheduler/processes')
export class ProcessesController {
  constructor(private processService: ProcessesService) {}

  @ApiResponse({ status: 200, type: GetProcessesDto })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  getProcesses(@Query() query) {
    return query['search'] ? this.processService.filterProcesses(query['search']) : this.processService.getProcesses();
  }

  @ApiResponse({ status: 200, type: [CreateParameterDto] })
  @ApiParam({ name: 'id' })
  @Get(':id/parameters')
  getParametersByProcesses(@Param() params) {
    return this.processService.getParametersByProcess(params['id']);
  }

  @ApiResponse({ status: 200, type: CreateProcessDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getProcess(@Param() params) {
    return this.processService.getProcess(params['id']);
  }
}
