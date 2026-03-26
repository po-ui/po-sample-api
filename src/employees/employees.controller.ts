import { Controller, Get, Param, Body, Post, Put, Query, Delete } from '@nestjs/common';
import { ApiResponse, ApiParam, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';

import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { GetEmployeesDto } from './dto/get-employees.dto';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {

  constructor(private employeesService: EmployeesService) {}

  @ApiResponse({ status: 200, type: GetEmployeesDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: '$filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  getEmployees(@Query() query) {
    const search = query['search'];
    const filter = query['$filter'];
    const page = query['page'];
    const pageSize = query['pageSize'];

    return this.employeesService.getEmployees(search, filter, page, pageSize);
  }

  @ApiResponse({ status: 200, type: CreateEmployeeDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getEmployee(@Param('id') id: string) {
    return this.employeesService.getEmployee(parseInt(id, 10));
  }

  @ApiResponse({ status: 201, type: CreateEmployeeDto })
  @ApiBody({ type: CreateEmployeeDto })
  @Post()
  save(@Body() employee: CreateEmployeeDto) {
    this.employeesService.save(employee);
  }

  @ApiResponse({ status: 200, type: CreateEmployeeDto })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateEmployeeDto })
  @Put(':id')
  update(@Body() employee: CreateEmployeeDto, @Param('id') id: string) {
    this.employeesService.update(parseInt(id, 10), employee);
  }

  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deleteEmployee(@Param('id') id: string) {
    return this.employeesService.delete(parseInt(id, 10));
  }

}
