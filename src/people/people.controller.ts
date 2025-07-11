import { Controller, Get, Param, Body, Post, Put, Query, Delete, Res } from '@nestjs/common';
import { ApiResponse, ApiParam, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';

import { PeopleService } from './people.service';
import { CreatePeopleDto } from './dto/create-people.dto';
import { GetPeopleDto } from './dto/get-people.dto';
import { BatchDeleteService } from 'src/batch-delete/batch-delete.service';
import { BatchDeletePeopleDto } from './dto/batch-delete-people.dto';

@ApiTags('people')
@Controller('people')
export class PeopleController {

  constructor(private peopleService: PeopleService, private batchDeleteService: BatchDeleteService) {}

  @ApiResponse({ status: 200, type: GetPeopleDto })
  @ApiQuery({name: 'search', required: false})
  @ApiQuery({name: 'filter', required: false})
  @ApiQuery({name: 'page', required: false})
  @ApiQuery({name: 'pageSize', required: false})
  @Get('batchDelete')
  getBatchDeletePeople(@Query() query) {
    const { search, filter, page, pageSize } = query;

    return this.peopleService.getPeople(search || filter, page, pageSize);
  }

  @ApiBody({ type: BatchDeletePeopleDto })
  @Post('batchDelete')
  async createBatchDelete(@Body() body: BatchDeletePeopleDto, @Res() res) {
    const result = await this.batchDeleteService.receiveGridData(body);
    return res.status(200).json(result);
  }

  @ApiResponse({ status: 200 })
  @Delete('batchDelete/:id')
  deleteBatchDelete(@Param('id') id: string) {
    return this.batchDeleteService.deleteItem(id);
  }

  @ApiResponse({ status: 200 })
  @Delete('batchDelete')
  deleteBatchDeleteQuery(@Query() query) {
    return this.batchDeleteService.deleteItemQuery(query);
  }

  @ApiResponse({ status: 200, type: GetPeopleDto })
  @ApiQuery({name: 'search', required: false})
  @ApiQuery({name: 'filter', required: false})
  @ApiQuery({name: 'page', required: false})
  @ApiQuery({name: 'pageSize', required: false})
  @Get()
  getPeople(@Query() query) {
    const { search, filter, page, pageSize } = query;

    return this.peopleService.getPeople(search || filter, page, pageSize);
  }

  @ApiResponse({ status: 204 })
  @Delete()
  deletePeople(@Body() body) {
    this.peopleService.deleteAll(body);
  }

  @ApiResponse({ status: 200, type: CreatePeopleDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getPerson(@Param() params) {
    return this.peopleService.getPerson(params['id']);
  }

  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deletePerson(@Param() params) {
    return this.peopleService.delete(params['id']);
  }

  @ApiResponse({ status: 201, type: CreatePeopleDto })
  @ApiBody({ type: CreatePeopleDto })
  @Post()
  save(@Body() person) {
    this.peopleService.save(person);
  }

  @ApiResponse({ status: 201, type: CreatePeopleDto })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreatePeopleDto })
  @Put(':id')
  update(@Body() person, @Param() param) {
    this.peopleService.update(param['id'], person);
  }
}
