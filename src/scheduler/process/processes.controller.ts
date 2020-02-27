import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiResponse, ApiParam } from '@nestjs/swagger';

import { ProcessesService } from './processes.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { GetProcessesDto } from './dto/get-processes.dto';
import { CreateParameterDto } from './dto/create-parameter.dto';

@ApiTags('processes')
@Controller('scheduler/processes')
export class ProcessesController {

  constructor(private processService: ProcessesService) {}

  @ApiResponse({ status: 200, type: GetProcessesDto })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  getProcesses(@Query() query) {
    return query['search'] ?
      this.processService.filterProcesses(query['search'])
      : this.processService.getProcesses();
  }

  @ApiResponse({ status: 200, type: CreateProcessDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getProcess(@Param() params) {
    return this.processService.getProcess(params['id']);
  }

  @ApiResponse({ status: 200, type: [CreateParameterDto] })
  @ApiParam({ name: 'id' })
  @Get(':id/parameters')
  getParametersByProcesses(@Param() params) {
    return this.processService.getParametersByProcess(params['id']);
  }

}
